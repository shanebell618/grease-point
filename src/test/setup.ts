import { afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { isMockPrismaClient, prisma } from "@/lib/prisma";

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  if (isMockPrismaClient(prisma)) {
    prisma.$clear();
  }
});
