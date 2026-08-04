import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";

export const getEquipmentByIdUseCase = async (id: string) => {
  return EquipmentDao.getById(id);
};
