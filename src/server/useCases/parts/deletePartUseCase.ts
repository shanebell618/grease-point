import { NotFoundError } from "../errors";
import { PartDao } from "@/server/dataAccess/PartDao";

export const deletePartUseCase = async (partId: string) => {
  const existing = await PartDao.getById(partId);
  if (!existing) throw new NotFoundError("Part");

  await PartDao.delete(partId);
};
