import { z } from "zod";

export const MAINTENANCE_STATUSES = [
  "SCHEDULED",
  "IN_PROGRESS",
  "WAITING_ON_PARTS",
  "COMPLETE",
] as const;

export const createMaintenanceInputSchema = z.object({
  equipmentId: z.string().trim().min(1, "Equipment is required"),
  performedAt: z.coerce.date(),
  description: z.string().trim().min(1, "Description is required"),
  status: z.enum(MAINTENANCE_STATUSES),
  cost: z.coerce.number().nonnegative().optional().nullable(),
  nextDueHours: z.coerce.number().nonnegative().optional().nullable(),
  nextDueDate: z.coerce.date().optional().nullable(),
});

export type CreateMaintenanceInput = z.infer<
  typeof createMaintenanceInputSchema
>;
