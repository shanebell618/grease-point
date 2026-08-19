export const maintenanceKeys = {
  all: ["maintenance"] as const,
  list: (equipmentId?: string) =>
    [...maintenanceKeys.all, "list", equipmentId ?? "ALL"] as const,
  detail: (id: string) => [...maintenanceKeys.all, "detail", id] as const,
};
