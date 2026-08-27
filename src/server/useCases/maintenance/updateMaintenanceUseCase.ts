import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";
import { NotFoundError } from "../errors";

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

  return MaintenanceDao.update(id, {
    ...input,
    ...(isBecomingComplete && { completedAt: new Date() }),
    ...(isLeavingComplete && { completedAt: null }),
  });
};
