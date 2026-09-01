import { PartDao } from "@/server/dataAccess/PartDao";

export const getAllPartsUseCase = async (search?: string) => {
  return PartDao.getAll(search);
};
