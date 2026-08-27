import { EquipmentDao } from "@/server/dataAccess/EquipmentDao";

// Called when a maintenance record enters IN_PROGRESS — the equipment is
// actively being worked on, so it can't be in use regardless of what the
// maintenance is for. Deliberately one-directional: nothing here reverts
// the equipment's status when the record leaves IN_PROGRESS again.
// Deciding when equipment is actually safe to use is a manual call (see
// EquipmentStatusControl), not something this can infer.
export const syncEquipmentOutOfServiceUseCase = async (equipmentId: string) => {
  const equipment = await EquipmentDao.getById(equipmentId);
  if (!equipment) return;

  // RETIRED and OUT_OF_SERVICE are both terminal/already-correct here —
  // don't let an active maintenance record silently pull retired
  // equipment back into an operational status, and don't bother with a
  // redundant write if it's already marked out of service.
  if (equipment.status === "RETIRED" || equipment.status === "OUT_OF_SERVICE") {
    return;
  }

  await EquipmentDao.update(equipmentId, { status: "OUT_OF_SERVICE" });
};
