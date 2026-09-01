import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";
import { NotFoundError } from "../errors";
import { reconcilePartUsageUseCase } from "./reconcilePartUsageUseCase";
import { withTransaction } from "@/lib/prisma";

export const deleteMaintenanceUseCase = async (maintenanceRecordId: string) => {
  return withTransaction(async () => {
    const existing = await MaintenanceDao.getById(maintenanceRecordId);
    if (!existing) throw new NotFoundError("Maintenance record");

    // Restore any consumed stock before the record (and its PartUsage rows, via cascade) disappears — order matters here.
    await reconcilePartUsageUseCase(maintenanceRecordId, []);
    await MaintenanceDao.delete(maintenanceRecordId);
  });
};
