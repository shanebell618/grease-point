import type { CreateEquipmentInput } from "@/server/schemas/equipment/createEquipmentInputSchema";
import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";

export const createEquipmentUseCase = async (input: CreateEquipmentInput) => {
  const { vin, photoUrl, notes, ...rest } = input;

  return EquipmentDao.create({
    ...rest,
    vin: vin || null,
    photoUrl: photoUrl || null,
    notes: notes || null,
  });
};
