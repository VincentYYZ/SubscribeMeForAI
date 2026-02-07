import * as Sentry from '@sentry/nextjs';

/**
 * Sentry edge runtime configuration
 * Initializes error tracking for Edge runtime (middleware, edge API routes)
 * Note: Edge runtime has limitations - cannot import from lib/config
 */
const SENTRY_DSN = process.env.SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
    // Adjust this value in production as needed
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Enable debug mode in development
    debug: process.env.NODE_ENV === 'development',

    // Environment
    environment: process.env.NODE_ENV || 'development',
  });
}
