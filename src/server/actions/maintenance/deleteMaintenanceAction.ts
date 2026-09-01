import { deleteMaintenanceUseCase } from "@/server/useCases/maintenance/deleteMaintenanceUseCase";

export const deleteMaintenanceAction = async (maintenanceRecordId: string) => {
  return deleteMaintenanceUseCase(maintenanceRecordId);
};
