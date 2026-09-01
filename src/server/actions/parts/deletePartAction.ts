import { deletePartUseCase } from "@/server/useCases/parts/deletePartUseCase";

export const deletePartAction = async (partId: string) => {
  return deletePartUseCase(partId);
};
