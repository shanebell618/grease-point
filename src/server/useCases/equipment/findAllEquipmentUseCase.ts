import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";
import type { EquipmentStatus } from "@/generated/prisma/enums";

export const findAllEquipmentUseCase = async (status?: EquipmentStatus) => {
  return EquipmentDao.findMany(status);
};
