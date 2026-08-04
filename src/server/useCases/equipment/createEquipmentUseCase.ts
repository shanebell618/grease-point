import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";
import type { CreateEquipmentInput } from "@/server/schemas/equipment/createEquipmentInputSchema";

// Input is already validated by createEquipmentAction — this stays free of
// zod so it's easy to call from other entry points (a seed script, another
// action) without re-validating.
export const createEquipmentUseCase = async (input: CreateEquipmentInput) => {
  const { vin, photoUrl, notes, ...rest } = input;

  return EquipmentDao.create({
    ...rest,
    vin: vin || null,
    photoUrl: photoUrl || null,
    notes: notes || null,
  });
};
