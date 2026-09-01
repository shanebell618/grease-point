import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";
import { reconcilePartUsageUseCase } from "./reconcilePartUsageUseCase";
import { syncEquipmentOutOfServiceUseCase } from "./syncEquipmentOutOfServiceUseCase";
import { withTransaction } from "@/lib/prisma";

export const createMaintenanceUseCase = async (
  input: CreateMaintenanceInput,
) => {
  const { partsUsed, ...maintenanceInput } = input;

  return withTransaction(async () => {
    const maintenance = await MaintenanceDao.create({
      ...maintenanceInput,
      completedAt: maintenanceInput.status === "COMPLETE" ? new Date() : null,
    });

    if (maintenanceInput.status === "IN_PROGRESS") {
      await syncEquipmentOutOfServiceUseCase(maintenanceInput.equipmentId);
    }

    const target =
      maintenanceInput.status === "COMPLETE" ? (partsUsed ?? []) : [];
    await reconcilePartUsageUseCase(maintenance.id, target);

    return maintenance;
  });
};
