import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";
import type { CreateEquipmentInput } from "@/server/schemas/equipment/createEquipmentInputSchema";

import { NotFoundError } from "../errors";

// Input is already validated by updateEquipmentAction.
export const updateEquipmentUseCase = async (
  id: string,
  input: Partial<CreateEquipmentInput>,
) => {
  const existing = await EquipmentDao.getById(id);
  if (!existing) throw new NotFoundError("Equipment");

  const { vin, photoUrl, notes, ...rest } = input;

  return EquipmentDao.update(id, {
    ...rest,
    ...(vin !== undefined && { vin: vin || null }),
    ...(photoUrl !== undefined && { photoUrl: photoUrl || null }),
    ...(notes !== undefined && { notes: notes || null }),
  });
};
