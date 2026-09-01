import { z } from "zod";

export const MAINTENANCE_STATUSES = [
  "SCHEDULED",
  "IN_PROGRESS",
  "WAITING_ON_PARTS",
  "COMPLETE",
] as const;

export const partUsageInputSchema = z.object({
  partId: z.string().trim().min(1),
  quantityUsed: z.coerce.number().int().positive(),
});

export const createMaintenanceInputSchema = z.object({
  equipmentId: z.string().trim().min(1, "Equipment is required"),
  serviceDate: z.coerce.date(),
  description: z.string().trim().min(1, "Description is required"),
  status: z.enum(MAINTENANCE_STATUSES),
  cost: z.coerce.number().nonnegative().optional().nullable(),
  nextDueHours: z.coerce.number().nonnegative().optional().nullable(),
  nextDueDate: z.coerce.date().optional().nullable(),
  partsUsed: z.array(partUsageInputSchema).optional(),
});

export type CreateMaintenanceInput = z.infer<
  typeof createMaintenanceInputSchema
>;
export type PartUsageInput = z.infer<typeof partUsageInputSchema>;
