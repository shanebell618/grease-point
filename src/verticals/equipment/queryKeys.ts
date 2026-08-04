import type { EquipmentStatus } from "./types";

export const equipmentKeys = {
  all: ["equipment"] as const,
  list: (status?: EquipmentStatus) =>
    [...equipmentKeys.all, "list", status ?? "ALL"] as const,
  detail: (id: string) => [...equipmentKeys.all, "detail", id] as const,
};
