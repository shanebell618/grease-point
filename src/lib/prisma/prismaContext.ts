import { AsyncLocalStorage } from "node:async_hooks";
import type { PrismaClient } from "@/generated/prisma/client";

// Holds the current transaction's Prisma client, if getPrisma() is being
// called from inside a withTransaction() callback's call stack.
export const prismaContext = new AsyncLocalStorage<PrismaClient>();
