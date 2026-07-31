import { z } from "zod";

export const EQUIPMENT_STATUSES = [
  "ACTIVE",
  "MAINTENANCE",
  "RETIRED",
  "OUT_OF_SERVICE",
] as const;

// Single source of truth for both the API route's server-side validation
// and the create/edit form's client-side validation.
export const equipmentInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  serialNumber: z.string().trim().min(1, "Serial number is required"),
  vin: z.string().trim().optional().or(z.literal("")),
  status: z.enum(EQUIPMENT_STATUSES),
  purchasePrice: z.coerce.number().nonnegative().optional().nullable(),
  engineHours: z.coerce.number().nonnegative().optional().nullable(),
  photoUrl: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type EquipmentInput = z.infer<typeof equipmentInputSchema>;
