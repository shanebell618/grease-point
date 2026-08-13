import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { equipmentFactory } from "./equipmentFactory";

let sequence = 0;

export const maintenanceFactory = {
  create: async (
    overrides: Partial<Prisma.MaintenanceRecordUncheckedCreateInput> = {},
  ) => {
    sequence += 1;
    const equipmentId =
      overrides.equipmentId ?? (await equipmentFactory.create()).id;

    return prisma.maintenanceRecord.create({
      data: {
        performedAt: new Date(),
        description: `Test maintenance ${sequence}`,
        status: "SCHEDULED",
        ...overrides,
        equipmentId,
      },
    });
  },
};
