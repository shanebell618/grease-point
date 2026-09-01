import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/lib/prisma";

export class MaintenanceDao {
  static async getAll() {
    return getPrisma().maintenanceRecord.findMany({
      orderBy: { serviceDate: "desc" },
    });
  }

  static async getAllByEquipmentId(equipmentId: string) {
    return getPrisma().maintenanceRecord.findMany({
      where: { equipmentId },
      orderBy: { serviceDate: "desc" },
    });
  }

  static async getAllActiveOrRecentlyCompleted(completedAfter: Date) {
    return getPrisma().maintenanceRecord.findMany({
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
    return getPrisma().maintenanceRecord.findUnique({
      where: { id },
      include: { partUsages: true },
    });
  }

  static async create(data: Prisma.MaintenanceRecordUncheckedCreateInput) {
    return getPrisma().maintenanceRecord.create({ data });
  }

  static async update(
    id: string,
    data: Prisma.MaintenanceRecordUncheckedUpdateInput,
  ) {
    return getPrisma().maintenanceRecord.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return getPrisma().maintenanceRecord.delete({ where: { id } });
  }
}
