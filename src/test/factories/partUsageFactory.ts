import type { Prisma } from "@/generated/prisma/client";
import { maintenanceFactory } from "./maintenanceFactory";
import { partFactory } from "./partFactory";
import { prisma } from "@/lib/prisma";

export const partUsageFactory = {
  create: async (
    overrides: Partial<Prisma.PartUsageUncheckedCreateInput> = {},
  ) => {
    const partId = overrides.partId ?? (await partFactory.create()).id;
    const maintenanceRecordId =
      overrides.maintenanceRecordId ?? (await maintenanceFactory.create()).id;

    return prisma.partUsage.create({
      data: {
        quantityUsed: 1,
        ...overrides,
        partId,
        maintenanceRecordId,
      },
    });
  },
};
