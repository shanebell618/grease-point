import type { CreatePartInput } from "@/server/schemas/parts/createPartInputSchema";
import { NotFoundError } from "../errors";
import { PartDao } from "@/server/dataAccess/PartDao";

export const updatePartUseCase = async (
  partId: string,
  input: Partial<CreatePartInput>,
) => {
  const existing = await PartDao.getById(partId);
  if (!existing) throw new NotFoundError("Part");

  return PartDao.update(partId, input);
};
