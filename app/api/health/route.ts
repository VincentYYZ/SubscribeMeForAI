import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Health Check API Endpoint
 *
 * This endpoint provides health status of the application including:
 * - API availability
 * - Database connection
 * - Application uptime
 *
 * Used by monitoring tools and deployment scripts
 */

export async function GET() {
  const startTime = Date.now();

  try {
    // Test database connection with a simple query
    // This verifies that:
    // 1. Database is reachable
    // 2. Prisma client is working
    // 3. Connection pool has available connections
    await prisma.$queryRaw`SELECT 1`;

    const responseTime = Date.now() - startTime;

    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        database: {
          status: 'connected',
          responseTime: `${responseTime}ms`,
        },
        memory: {
          used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
          total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    // Database connection failed
    const responseTime = Date.now() - startTime;

    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV,
        database: {
          status: 'disconnected',
          responseTime: `${responseTime}ms`,
          error: error instanceof Error ? error.message : 'Unknown error',
        },
        memory: {
          used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
          total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`,
        },
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
