import type { PrismaClient } from "@/generated/prisma/client";
import { buildRealPrismaClient } from "./client";
import { buildMockPrismaClient } from "./mockClient";
import { isPrismaMockEnabled } from "./mockMode";

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
