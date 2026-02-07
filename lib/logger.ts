/**
 * Client-safe logger wrapper
 * This can be safely imported in both client and server code
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isServer = typeof window === 'undefined';
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Log a debug message
   */
  debug(message: string, context?: LogContext) {
    this.log('debug', message, context);
  }

  /**
   * Log an info message
   */
  info(message: string, context?: LogContext) {
    this.log('info', message, context);
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: LogContext) {
    this.log('warn', message, context);
  }

  /**
   * Log an error message
   */
  error(message: string, error?: Error | unknown, context?: LogContext) {
    const errorContext = error instanceof Error
      ? { error: error.message, stack: error.stack, ...context }
      : { error, ...context };

    this.log('error', message, errorContext);
  }

  /**
   * Internal logging method
   */
  private log(level: LogLevel, message: string, context?: LogContext) {
    // On the server, we should use the Pino logger (imported dynamically to avoid bundling)
    // On the client, we use console methods

    if (this.isServer) {
      // Server-side: use Pino logger
      // Note: This dynamic import won't be bundled in client code
      // because this branch only runs on server
      import('./logger.server').then(({ logger }) => {
        logger[level](context || {}, message);
      }).catch(() => {
        // Fallback to console if logger.server can't be loaded
        this.consoleLog(level, message, context);
      });
    } else {
      // Client-side: use console
      this.consoleLog(level, message, context);
    }
  }

  /**
   * Console logging (fallback or client-side)
   */
  private consoleLog(level: LogLevel, message: string, context?: LogContext) {
    // Only log debug messages in development
    if (level === 'debug' && !this.isDevelopment) {
      return;
    }

    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

    switch (level) {
      case 'debug':
        console.debug(prefix, message, context || '');
        break;
      case 'info':
        console.info(prefix, message, context || '');
        break;
      case 'warn':
        console.warn(prefix, message, context || '');
        break;
      case 'error':
        console.error(prefix, message, context || '');
        break;
    }
  }

  /**
   * Create a child logger with additional context
   */
  child(bindings: LogContext): ChildLogger {
    return new ChildLogger(this, bindings);
  }
}

/**
 * Child logger that includes additional context in all logs
 */
class ChildLogger extends Logger {
  constructor(
    private parent: Logger,
    private bindings: LogContext
  ) {
    super();
  }

  debug(message: string, context?: LogContext) {
    super.debug(message, { ...this.bindings, ...context });
  }

  info(message: string, context?: LogContext) {
    super.info(message, { ...this.bindings, ...context });
  }

  warn(message: string, context?: LogContext) {
    super.warn(message, { ...this.bindings, ...context });
  }

  error(message: string, error?: Error | unknown, context?: LogContext) {
    super.error(message, error, { ...this.bindings, ...context });
  }
}

/**
 * Global logger instance
 * Safe to import in both client and server code
 */
export const logger = new Logger();
