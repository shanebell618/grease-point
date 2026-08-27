import { deleteMaintenanceUseCase } from "@/server/useCases/maintenance/deleteMaintenanceUseCase";

export const deleteMaintenanceAction = async (id: string) => {
  return deleteMaintenanceUseCase(id);
};
