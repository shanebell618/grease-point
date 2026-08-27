import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";

export const getAllMaintenanceUseCase = async () => {
  return MaintenanceDao.getAll();
};
