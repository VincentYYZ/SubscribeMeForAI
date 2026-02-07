import { initTRPC } from '@trpc/server'
import { prisma } from '@/lib/prisma'
import { logger } from '@/lib/logger.server'

const t = initTRPC.context().create()

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

export const router = t.router

// Public procedure with logging middleware
export const publicProcedure = t.procedure.use(loggingMiddleware)
