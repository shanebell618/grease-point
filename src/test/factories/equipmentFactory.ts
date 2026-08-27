import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

let sequence = 0;

export const equipmentFactory = {
  create: async (overrides: Partial<Prisma.EquipmentCreateInput> = {}) => {
    sequence += 1;
    return prisma.equipment.create({
      data: {
        name: `Test Equipment ${sequence}`,
        vin: `TEST-VIN-${sequence}`,
        status: "ACTIVE",
        ...overrides,
      },
    });
  },
};
