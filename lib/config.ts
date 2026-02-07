import { env } from './env';

/**
 * Application configuration
 * All configuration values should be exported from here
 * This provides a single source of truth for all config
 */
export const config = {
  database: {
    url: env.DATABASE_URL,
  },
  auth: {
    secret: env.NEXTAUTH_SECRET,
    url: env.NEXTAUTH_URL,
  },
  monitoring: {
    sentryDsn: env.SENTRY_DSN,
  },
  app: {
    env: env.NODE_ENV,
    isDevelopment: env.NODE_ENV === 'development',
    isProduction: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
    url: env.NEXTAUTH_URL,
  },
} as const;
