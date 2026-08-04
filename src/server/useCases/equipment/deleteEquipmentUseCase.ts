import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";

import { NotFoundError } from "../errors";

export const deleteEquipmentUseCase = async (id: string) => {
  const existing = await EquipmentDao.getById(id);
  if (!existing) throw new NotFoundError("Equipment");

  await EquipmentDao.delete(id);
};
