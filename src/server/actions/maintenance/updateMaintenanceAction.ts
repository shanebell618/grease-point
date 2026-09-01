import { createMaintenanceInputSchema } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { updateMaintenanceUseCase } from "@/server/useCases/maintenance/updateMaintenanceUseCase";

export const updateMaintenanceAction = async (
  maintenanceRecordId: string,
  input: unknown,
) => {
  const validatedInput = createMaintenanceInputSchema.partial().parse(input);
  return updateMaintenanceUseCase(maintenanceRecordId, validatedInput);
};
