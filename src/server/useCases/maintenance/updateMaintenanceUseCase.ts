import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";
import { NotFoundError } from "../errors";
import { reconcilePartUsageUseCase } from "./reconcilePartUsageUseCase";
import { syncEquipmentOutOfServiceUseCase } from "./syncEquipmentOutOfServiceUseCase";
import { withTransaction } from "@/lib/prisma";

export const updateMaintenanceUseCase = async (
  maintenanceRecordId: string,
  input: Partial<CreateMaintenanceInput>,
) => {
  const { partsUsed, ...maintenanceInput } = input;

  return withTransaction(async () => {
    const existing = await MaintenanceDao.getById(maintenanceRecordId);
    if (!existing) throw new NotFoundError("Maintenance record");

    const isBecomingComplete =
      maintenanceInput.status === "COMPLETE" && existing.status !== "COMPLETE";
    const isLeavingComplete =
      maintenanceInput.status !== undefined &&
      maintenanceInput.status !== "COMPLETE" &&
      existing.status === "COMPLETE";
    const isEnteringInProgress =
      maintenanceInput.status === "IN_PROGRESS" &&
      existing.status !== "IN_PROGRESS";

    const updated = await MaintenanceDao.update(maintenanceRecordId, {
      ...maintenanceInput,
      ...(isBecomingComplete && { completedAt: new Date() }),
      ...(isLeavingComplete && { completedAt: null }),
    });

    if (isEnteringInProgress) {
      await syncEquipmentOutOfServiceUseCase(existing.equipmentId);
    }

    const effectiveStatus = maintenanceInput.status ?? existing.status;
    if (effectiveStatus !== "COMPLETE") {
      // Not (or no longer) COMPLETE — nothing should be attached, regardless of what was submitted.
      await reconcilePartUsageUseCase(maintenanceRecordId, []);
    } else if (partsUsed !== undefined) {
      // Explicitly submitted a parts list while COMPLETE.
      await reconcilePartUsageUseCase(maintenanceRecordId, partsUsed);
    }
    // else: still/becoming COMPLETE, but this call never touched parts — leave whatever's already attached alone.

    return updated;
  });
};
