import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

let sequence = 0;

export const partFactory = {
  create: async (overrides: Partial<Prisma.PartCreateInput> = {}) => {
    sequence += 1;
    return prisma.part.create({
      data: {
        sku: `TEST-SKU-${sequence}`,
        name: `Test Part ${sequence}`,
        quantityOnHand: 10,
        reorderThreshold: 2,
        ...overrides,
      },
    });
  },
};
