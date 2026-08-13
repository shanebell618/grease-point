import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";

export const createMaintenanceUseCase = async (
  input: CreateMaintenanceInput,
) => {
  return MaintenanceDao.create(input);
};
