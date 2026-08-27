import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";
import { NotFoundError } from "../errors";
import { syncEquipmentOutOfServiceUseCase } from "./syncEquipmentOutOfServiceUseCase";

export const updateMaintenanceUseCase = async (
  id: string,
  input: Partial<CreateMaintenanceInput>,
) => {
  const existing = await MaintenanceDao.getById(id);
  if (!existing) throw new NotFoundError("Maintenance record");

  const isBecomingComplete =
    input.status === "COMPLETE" && existing.status !== "COMPLETE";
  const isLeavingComplete =
    input.status !== undefined &&
    input.status !== "COMPLETE" &&
    existing.status === "COMPLETE";
  const isEnteringInProgress =
    input.status === "IN_PROGRESS" && existing.status !== "IN_PROGRESS";

  const updated = await MaintenanceDao.update(id, {
    ...input,
    ...(isBecomingComplete && { completedAt: new Date() }),
    ...(isLeavingComplete && { completedAt: null }),
  });

  if (isEnteringInProgress) {
    await syncEquipmentOutOfServiceUseCase(existing.equipmentId);
  }

  return updated;
};
