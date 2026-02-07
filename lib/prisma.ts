import { PrismaClient } from '@prisma/client';
import { config } from './config';
import { logger } from './logger.server';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: config.database.url,
      },
    },
    log: config.app.isDevelopment ? ['query', 'error', 'warn'] : ['error'],
  });

// Event listeners for logging database operations
if (config.app.isDevelopment) {
  prisma.$on('query', (e) => {
    logger.debug(
      {
        query: e.query,
        params: e.params,
        duration: e.duration,
      },
      'Database query executed'
    );
  });
}

prisma.$on('error', (e) => {
  logger.error(
    {
      target: e.target,
      message: e.message,
    },
    'Database error occurred'
  );
});

prisma.$on('warn', (e) => {
  logger.warn(
    {
      target: e.target,
      message: e.message,
    },
    'Database warning'
  );
});

// Graceful shutdown handler
const gracefulShutdown = async () => {
  logger.info('Gracefully shutting down Prisma client...');
  await prisma.$disconnect();
  logger.info('Prisma client disconnected');
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

if (!config.app.isProduction) globalForPrisma.prisma = prisma;
