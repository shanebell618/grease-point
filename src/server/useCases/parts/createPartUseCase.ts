import type { CreatePartInput } from "@/server/schemas/parts/createPartInputSchema";
import { PartDao } from "@/server/dataAccess/PartDao";

export const createPartUseCase = async (input: CreatePartInput) => {
  return PartDao.create(input);
};
