import type { MaintenanceRecordModel } from "@/generated/prisma/models";

// The shape as it actually arrives on the client: JSON has no Date type,
// so date fields come back as ISO strings (or null), not Date instances.
export type Maintenance = Omit<
  MaintenanceRecordModel,
  "performedAt" | "nextDueDate" | "createdAt"
> & {
  performedAt: string;
  nextDueDate: string | null;
  createdAt: string;
};
export type { MaintenanceStatus } from "@/generated/prisma/enums";
