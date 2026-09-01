import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/lib/prisma";

export class PartUsageDao {
  static async getAllByMaintenanceRecordId(maintenanceRecordId: string) {
    return getPrisma().partUsage.findMany({
      where: { maintenanceRecordId },
    });
  }

  static async createMany(data: Prisma.PartUsageCreateManyInput[]) {
    return getPrisma().partUsage.createMany({ data });
  }

  static async deleteAllByMaintenanceRecordId(maintenanceRecordId: string) {
    return getPrisma().partUsage.deleteMany({
      where: { maintenanceRecordId },
    });
  }
}
