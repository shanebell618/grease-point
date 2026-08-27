import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";
import { syncEquipmentOutOfServiceUseCase } from "./syncEquipmentOutOfServiceUseCase";

export const createMaintenanceUseCase = async (
  input: CreateMaintenanceInput,
) => {
  const maintenance = await MaintenanceDao.create({
    ...input,
    completedAt: input.status === "COMPLETE" ? new Date() : null,
  });

  if (input.status === "IN_PROGRESS") {
    await syncEquipmentOutOfServiceUseCase(input.equipmentId);
  }

  return maintenance;
};
