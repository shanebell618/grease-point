import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";

export const getAllMaintenanceByEquipmentIdUseCase = async (
  equipmentId: string,
) => {
  return MaintenanceDao.getAllByEquipmentId(equipmentId);
};
