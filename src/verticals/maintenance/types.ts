import type { MaintenanceRecordModel } from "@/generated/prisma/models";
import type { PartUsageInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";

// The shape as it actually arrives on the client: JSON has no Date type,
// so date fields come back as ISO strings (or null), not Date instances.
//
// partsUsed is only populated by fetchMaintenanceById (the single-record
// fetch) — the list endpoints don't include the partUsages relation, so
// it's optional here rather than guaranteed on every Maintenance object.
export type Maintenance = Omit<
  MaintenanceRecordModel,
  "serviceDate" | "completedAt" | "nextDueDate" | "createdAt"
> & {
  serviceDate: string;
  completedAt: string | null;
  nextDueDate: string | null;
  createdAt: string;
  partsUsed?: PartUsageInput[];
};
export type { MaintenanceStatus } from "@/generated/prisma/enums";
