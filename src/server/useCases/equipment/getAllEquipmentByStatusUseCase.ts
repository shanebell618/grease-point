import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";
import type { EquipmentStatus } from "@/generated/prisma/enums";

export const getAllEquipmentByStatusUseCase = async (
  status: EquipmentStatus,
) => {
  return EquipmentDao.getAllByStatus(status);
};
