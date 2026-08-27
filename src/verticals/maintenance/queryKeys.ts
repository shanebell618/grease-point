export const maintenanceKeys = {
  all: ["maintenance"] as const,
  list: (equipmentId?: string) =>
    [...maintenanceKeys.all, "list", equipmentId ?? "ALL"] as const,
  activeOrRecentlyCompleted: () =>
    [...maintenanceKeys.all, "activeOrRecentlyCompleted"] as const,
  detail: (id: string) => [...maintenanceKeys.all, "detail", id] as const,
};
