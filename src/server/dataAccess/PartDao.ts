import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/lib/prisma";

export class PartDao {
  static async getAll(search?: string) {
    return getPrisma().part.findMany({
      where: search
        ? {
            OR: [{ name: { contains: search } }, { sku: { contains: search } }],
          }
        : undefined,
      orderBy: { name: "asc" },
    });
  }

  static async getById(id: string) {
    return getPrisma().part.findUnique({ where: { id } });
  }

  static async create(data: Prisma.PartCreateInput) {
    return getPrisma().part.create({ data });
  }

  static async update(id: string, data: Prisma.PartUpdateInput) {
    return getPrisma().part.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return getPrisma().part.delete({ where: { id } });
  }
}
