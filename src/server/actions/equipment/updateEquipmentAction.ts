import { createEquipmentInputSchema } from "@/server/schemas/equipment/createEquipmentInputSchema";
import { updateEquipmentUseCase } from "@/server/useCases/equipment/updateEquipmentUseCase";

export const updateEquipmentAction = async (id: string, input: unknown) => {
  const validatedInput = createEquipmentInputSchema.partial().parse(input);
  return updateEquipmentUseCase(id, validatedInput);
};
