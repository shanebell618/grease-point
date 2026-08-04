import { deleteEquipmentUseCase } from "@/server/useCases/equipment/deleteEquipmentUseCase";

// Nothing to validate beyond the id (already a route param, already a
// string) — this exists mainly for symmetry with create/update, and as the
// single call site other future entry points (a script, a batch job) would
// go through.
export const deleteEquipmentAction = async (id: string) => {
  return deleteEquipmentUseCase(id);
};
