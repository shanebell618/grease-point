import { createMaintenanceInputSchema } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { createMaintenanceUseCase } from "@/server/useCases/maintenance/createMaintenanceUseCase";

export const createMaintenanceAction = async (input: unknown) => {
  const validatedInput = createMaintenanceInputSchema.parse(input);
  return createMaintenanceUseCase(validatedInput);
};
