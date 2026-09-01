import { PartDao } from "@/server/dataAccess/PartDao";

export const getPartByIdUseCase = async (partId: string) => {
  return PartDao.getById(partId);
};
