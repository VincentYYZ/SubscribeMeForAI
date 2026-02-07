import { initTRPC, TRPCError } from '@trpc/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger.server'
import { apiLimiter } from '@/lib/rate-limit'

/**
 * Context type for tRPC procedures
 */
export type Context = {
  req?: Request
}

const t = initTRPC.context<Context>().create()

/**
 * Logging middleware for tRPC procedures
 * Logs request start, duration, success/error for all procedures
 */
const loggingMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now()
  const requestId = Math.random().toString(36).substring(7)

  // Log request start
  logger.info({
    requestId,
    path,
    type,
    event: 'request_start',
  }, `tRPC ${type} ${path} started`)

  try {
    // Execute the procedure
    const result = await next()
    const duration = Date.now() - start

    // Log successful completion
    logger.info({
      requestId,
      path,
      type,
      duration,
      event: 'request_success',
    }, `tRPC ${type} ${path} completed in ${duration}ms`)

    return result
  } catch (error) {
    const duration = Date.now() - start

    // Log error
    logger.error({
      requestId,
      path,
      type,
      duration,
      event: 'request_error',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, `tRPC ${type} ${path} failed after ${duration}ms`)

    throw error
  }
})

/**
 * Rate limiting middleware
 * Limits requests per IP address to prevent abuse
 */
const rateLimitMiddleware = t.middleware(async ({ ctx, next }) => {
  const req = ctx.req

  if (!req) {
    // If no request object (e.g., SSR), skip rate limiting
    return next()
  }

  // Extract IP address from headers
  const forwardedFor = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  const ip = forwardedFor?.split(',')[0].trim() || realIp || 'unknown'

  try {
    const result = await apiLimiter.limit(ip)

    if (!result.success) {
      logger.warn(
        { ip, limit: result.limit, reset: result.reset },
        'Rate limit exceeded'
      )
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many requests. Please try again later.',
      })
    }

    logger.debug({ ip, remaining: result.remaining }, 'Rate limit check passed')
    return next()
  } catch (error) {
    if (error instanceof TRPCError) {
      throw error
    }
    // If rate limiting fails, log and continue (fail open)
    logger.error({ error, ip }, 'Rate limiting error, allowing request')
    return next()
  }
})

/**
 * Timeout middleware
 * Prevents requests from hanging indefinitely
 */
const timeoutMiddleware = t.middleware(async ({ next }) => {
  const timeoutMs = 30000 // 30 seconds

  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(
        new TRPCError({
          code: 'TIMEOUT',
          message: 'Request timed out',
        })
      )
    }, timeoutMs)
  })

  try {
    return await Promise.race([next(), timeoutPromise])
  } catch (error) {
    if (error instanceof TRPCError && error.code === 'TIMEOUT') {
      logger.warn('Request timed out after 30 seconds')
    }
    throw error
  }
})

export const router = t.router

// Public procedure with all middleware applied
export const publicProcedure = t.procedure
  .use(timeoutMiddleware)
  .use(rateLimitMiddleware)
  .use(loggingMiddleware)
