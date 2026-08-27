import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";

export const getMaintenanceByIdUseCase = async (id: string) => {
  return MaintenanceDao.getById(id);
};
