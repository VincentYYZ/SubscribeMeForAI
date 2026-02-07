import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { logger } from './logger.server'

/**
 * In-memory store for development/fallback when Upstash Redis is not configured
 */
class MemoryStore {
  private store = new Map<string, { count: number; reset: number }>()

  async limit(key: string, maxRequests: number, windowMs: number) {
    const now = Date.now()
    const record = this.store.get(key)

    // Clear expired entries periodically
    if (Math.random() < 0.01) {
      for (const [k, v] of this.store.entries()) {
        if (v.reset < now) {
          this.store.delete(k)
        }
      }
    }

    if (!record || record.reset < now) {
      // New window
      this.store.set(key, { count: 1, reset: now + windowMs })
      return {
        success: true,
        limit: maxRequests,
        remaining: maxRequests - 1,
        reset: now + windowMs,
      }
    }

    if (record.count >= maxRequests) {
      // Rate limit exceeded
      return {
        success: false,
        limit: maxRequests,
        remaining: 0,
        reset: record.reset,
      }
    }

    // Increment count
    record.count++
    this.store.set(key, record)

    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - record.count,
      reset: record.reset,
    }
  }
}

const memoryStore = new MemoryStore()

/**
 * Create a rate limiter instance
 * Uses Upstash Redis if available, falls back to in-memory store
 */
function createRateLimiter(maxRequests: number, windowMs: number) {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (upstashUrl && upstashToken) {
    try {
      const redis = new Redis({
        url: upstashUrl,
        token: upstashToken,
      })

      logger.info('Using Upstash Redis for rate limiting')

      return new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(maxRequests, `${windowMs} ms`),
        analytics: true,
        prefix: 'ratelimit',
      })
    } catch (error) {
      logger.warn(
        { error },
        'Failed to initialize Upstash Redis, falling back to memory store'
      )
    }
  } else {
    logger.info('Upstash Redis not configured, using in-memory rate limiting')
  }

  // Fallback to memory store
  return {
    limit: async (key: string) => memoryStore.limit(key, maxRequests, windowMs),
  }
}

/**
 * Rate limiter for general API requests
 * 100 requests per minute per IP
 */
export const apiLimiter = createRateLimiter(100, 60 * 1000)

/**
 * Rate limiter for authentication endpoints
 * 5 requests per 5 minutes per IP
 */
export const authLimiter = createRateLimiter(5, 5 * 60 * 1000)
