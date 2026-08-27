import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";

export const getAllEquipmentUseCase = async () => {
  return EquipmentDao.getAll();
};
