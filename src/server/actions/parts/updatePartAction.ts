import { createPartInputSchema } from "@/server/schemas/parts/createPartInputSchema";
import { updatePartUseCase } from "@/server/useCases/parts/updatePartUseCase";

export const updatePartAction = async (partId: string, input: unknown) => {
  const validatedInput = createPartInputSchema.partial().parse(input);
  return updatePartUseCase(partId, validatedInput);
};
