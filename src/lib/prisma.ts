import { PrismaClient } from '@prisma/client';

/**
 * Singleton PrismaClient instance to prevent connection exhaustion in serverless & hot-reloading
 * strictly complying with docs/RULES.md §7.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
