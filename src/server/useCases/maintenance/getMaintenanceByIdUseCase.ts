import { MaintenanceDao } from "@/server/dataAccess/MaintenanceDao";

// The DAO returns Prisma's raw `partUsages` relation (id, createdAt, etc.
// included). The client only ever needs partId + quantityUsed — the same
// shape it already submits on write (see partUsageInputSchema) — so this
// reshapes the relation into `partsUsed` rather than passing the raw rows
// through.
export const getMaintenanceByIdUseCase = async (id: string) => {
  const maintenance = await MaintenanceDao.getById(id);
  if (!maintenance) return null;

  const { partUsages, ...rest } = maintenance;
  return {
    ...rest,
    partsUsed: partUsages.map((partUsage) => ({
      partId: partUsage.partId,
      quantityUsed: partUsage.quantityUsed,
    })),
  };
};
