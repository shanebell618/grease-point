import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";
import { NotFoundError } from "../errors";

export const deleteMaintenanceUseCase = async (id: string) => {
  const existing = await MaintenanceDao.getById(id);
  if (!existing) throw new NotFoundError("Maintenance record");

  await MaintenanceDao.delete(id);
};
