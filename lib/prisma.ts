import { PrismaClient } from '@prisma/client';
import { config } from './config';
import { logger } from './logger.server';

// Extended PrismaClient type with event emitter
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: config.database.url,
      },
    },
    log: config.app.isDevelopment
      ? [
          { emit: 'event', level: 'query' },
          { emit: 'event', level: 'error' },
          { emit: 'event', level: 'warn' },
        ]
      : [{ emit: 'event', level: 'error' }],
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

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

if (!config.app.isProduction) globalThis.prismaGlobal = prisma;
