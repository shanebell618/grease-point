import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export class MaintenanceDao {
  static async getAll() {
    return prisma.maintenanceRecord.findMany({
      orderBy: { serviceDate: "desc" },
    });
  }

  static async getAllByEquipmentId(equipmentId: string) {
    return prisma.maintenanceRecord.findMany({
      where: { equipmentId },
      orderBy: { serviceDate: "desc" },
    });
  }

  static async getAllActiveOrRecentlyCompleted(completedAfter: Date) {
    return prisma.maintenanceRecord.findMany({
      where: {
        OR: [
          { status: { not: "COMPLETE" } },
          { completedAt: { gte: completedAfter } },
        ],
      },
      orderBy: { serviceDate: "desc" },
    });
  }

  static async getById(id: string) {
    return prisma.maintenanceRecord.findUnique({ where: { id } });
  }

  static async create(data: Prisma.MaintenanceRecordUncheckedCreateInput) {
    return prisma.maintenanceRecord.create({ data });
  }

  static async update(
    id: string,
    data: Prisma.MaintenanceRecordUncheckedUpdateInput,
  ) {
    return prisma.maintenanceRecord.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.maintenanceRecord.delete({ where: { id } });
  }
}
