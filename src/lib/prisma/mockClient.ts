import createPrismaMock from "prisma-mock/client";
import { Prisma, type PrismaClient } from "@/generated/prisma/client";
import * as dmmf from "@/generated/dmmf";

export type MockPrismaClient = PrismaClient & { $clear: () => void };

export const buildMockPrismaClient = (): MockPrismaClient => {
  return createPrismaMock(Prisma, { datamodel: dmmf }) as MockPrismaClient;
};

export const isMockPrismaClient = (
  client: unknown,
): client is MockPrismaClient => {
  return (
    typeof client === "object" &&
    client !== null &&
    typeof (client as MockPrismaClient).$clear === "function"
  );
};
