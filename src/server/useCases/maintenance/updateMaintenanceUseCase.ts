import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";
import { NotFoundError } from "../errors";

export const updateMaintenanceUseCase = async (
  id: string,
  input: Partial<CreateMaintenanceInput>,
) => {
  const existing = await MaintenanceDao.getById(id);
  if (!existing) throw new NotFoundError("Maintenance record");

  return MaintenanceDao.update(id, input);
};
