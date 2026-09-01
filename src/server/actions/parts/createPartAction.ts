import { createPartInputSchema } from "@/server/schemas/parts/createPartInputSchema";
import { createPartUseCase } from "@/server/useCases/parts/createPartUseCase";

export const createPartAction = async (input: unknown) => {
  const validatedInput = createPartInputSchema.parse(input);
  return createPartUseCase(validatedInput);
};
