import type { EquipmentStatus } from "@/generated/prisma/enums";
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/lib/prisma";

export class EquipmentDao {
  static async getAll() {
    return getPrisma().equipment.findMany({
      orderBy: { name: "asc" },
    });
  }

  static async getAllByStatus(status: EquipmentStatus) {
    return getPrisma().equipment.findMany({
      where: { status },
      orderBy: { name: "asc" },
    });
  }

  static async getById(id: string) {
    return getPrisma().equipment.findUnique({ where: { id } });
  }

  static async create(data: Prisma.EquipmentCreateInput) {
    return getPrisma().equipment.create({ data });
  }

  static async update(id: string, data: Prisma.EquipmentUpdateInput) {
    return getPrisma().equipment.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return getPrisma().equipment.delete({ where: { id } });
  }
}
