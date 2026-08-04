import { createEquipmentInputSchema } from "@/server/schemas/equipment/createEquipmentInputSchema";
import { createEquipmentUseCase } from "@/server/useCases/equipment/createEquipmentUseCase";

// Owns the boundary: validates raw, untrusted input before it ever reaches
// the use case. Reads (findAll/getById) skip this layer entirely and go
// straight from the route to the use case — there's nothing to validate
// beyond an id/query param, so an action would just be a pass-through.
export const createEquipmentAction = async (input: unknown) => {
  const validatedInput = createEquipmentInputSchema.parse(input);
  return createEquipmentUseCase(validatedInput);
};
