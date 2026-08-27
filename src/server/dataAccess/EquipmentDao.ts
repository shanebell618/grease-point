import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import type { EquipmentStatus } from "@/generated/prisma/enums";

export class EquipmentDao {
  static async getAll() {
    return prisma.equipment.findMany({
      orderBy: { name: "asc" },
    });
  }

  static async getAllByStatus(status: EquipmentStatus) {
    return prisma.equipment.findMany({
      where: { status },
      orderBy: { name: "asc" },
    });
  }

  static async getById(id: string) {
    return prisma.equipment.findUnique({ where: { id } });
  }

  static async create(data: Prisma.EquipmentCreateInput) {
    return prisma.equipment.create({ data });
  }

  static async update(id: string, data: Prisma.EquipmentUpdateInput) {
    return prisma.equipment.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.equipment.delete({ where: { id } });
  }
}
