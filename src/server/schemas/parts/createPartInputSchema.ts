import { z } from "zod";

export const createPartInputSchema = z.object({
  sku: z.string().trim().min(1, "SKU is required"),
  name: z.string().trim().min(1, "Name is required"),
  quantityOnHand: z.coerce.number().int().nonnegative(),
  reorderThreshold: z.coerce.number().int().nonnegative(),
  unitCost: z.coerce.number().nonnegative().optional().nullable(),
});

export type CreatePartInput = z.infer<typeof createPartInputSchema>;
