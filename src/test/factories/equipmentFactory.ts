import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

let sequence = 0;

export const equipmentFactory = {
  create: async (overrides: Partial<Prisma.EquipmentCreateInput> = {}) => {
    sequence += 1;
    return prisma.equipment.create({
      data: {
        name: `Test Equipment ${sequence}`,
        serialNumber: `TEST-SN-${sequence}`,
        status: "ACTIVE",
        ...overrides,
      },
    });
  },
};
