import type { PrismaClient } from "@/generated/prisma/client";
import { buildMockPrismaClient } from "./mockClient";
import { buildRealPrismaClient } from "./client";
import { isPrismaMockEnabled } from "./mockMode";
import { prismaContext } from "./prismaContext";

export { isPrismaMockEnabled } from "./mockMode";
export { isMockPrismaClient } from "./mockClient";

// Cached on globalThis so Next.js's dev-mode hot reloading doesn't spin up
// a fresh PrismaClient (and a fresh better-sqlite3 file handle) on every
// module re-evaluation.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaInstance() {
  if (isPrismaMockEnabled()) {
    return buildMockPrismaClient();
  }
  return buildRealPrismaClient();
}

export const prisma = globalForPrisma.prisma ?? createPrismaInstance();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Get the current active Prisma client. Outside a transaction, this is
 * just the normal singleton. Inside withTransaction(), every call — no
 * matter how deep, no matter how many DAOs it passes through —
 * transparently gets the transaction client instead, with no parameter
 * threading required.
 */
export function getPrisma(): PrismaClient {
  return prismaContext.getStore() ?? prisma;
}

/**
 * Run fn with a transaction client. Any DAO called via getPrisma()
 * anywhere inside fn automatically participates in this transaction.
 */
export async function withTransaction<T>(
  fn: (tx: PrismaClient) => Promise<T>,
): Promise<T> {
  return prisma.$transaction((tx) =>
    // Prisma's interactive-transaction client is technically a narrower
    // type than PrismaClient (no $transaction/$connect/etc. of its own)
    // — same category of boundary cast as mockClient.ts's MockPrismaClient.
    prismaContext.run(tx as PrismaClient, () => fn(tx as PrismaClient)),
  );
}
