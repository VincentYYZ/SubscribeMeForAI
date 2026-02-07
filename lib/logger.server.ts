import pino from 'pino';
import { config } from './config';

/**
 * Server-side logger using Pino
 * DO NOT import this in client-side code - use lib/logger.ts instead
 */
export const logger = pino({
  level: config.app.isDevelopment ? 'debug' : 'info',
  // Pretty printing in development for better readability
  transport: config.app.isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  // Base fields to include in every log
  base: {
    env: config.app.env,
  },
  // Timestamp format
  timestamp: pino.stdTimeFunctions.isoTime,
  // Format errors properly
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
});

/**
 * Create a child logger with additional context
 * @param bindings - Additional fields to add to all logs from this child logger
 */
export function createLogger(bindings: Record<string, unknown>) {
  return logger.child(bindings);
}

/**
 * Log an error with full stack trace and context
 */
export function logError(error: unknown, context?: Record<string, unknown>) {
  if (error instanceof Error) {
    logger.error(
      {
        err: error,
        stack: error.stack,
        ...context,
      },
      error.message
    );
  } else {
    logger.error({ error, ...context }, 'Unknown error occurred');
  }
}
