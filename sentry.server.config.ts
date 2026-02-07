import * as Sentry from '@sentry/nextjs';
import { config } from './lib/config';

/**
 * Sentry server-side configuration
 * Initializes error tracking for Node.js server runtime
 */
if (config.monitoring.sentryDsn) {
  Sentry.init({
    dsn: config.monitoring.sentryDsn,

    // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
    // Adjust this value in production as needed
    tracesSampleRate: config.app.isProduction ? 0.1 : 1.0,

    // Enable debug mode in development
    debug: config.app.isDevelopment,

    // Environment
    environment: config.app.env,

    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
  });
}
