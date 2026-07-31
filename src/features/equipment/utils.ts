import type { Equipment, EquipmentStatus } from "./types";

export function sortEquipmentByName<T extends Pick<Equipment, "name">>(
  items: T[],
  direction: "asc" | "desc" = "asc",
): T[] {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
  return direction === "asc" ? sorted : sorted.reverse();
}

export function filterEquipmentByStatus<T extends Pick<Equipment, "status">>(
  items: T[],
  status: EquipmentStatus | "ALL",
): T[] {
  if (status === "ALL") return items;
  return items.filter((item) => item.status === status);
}

export function formatEngineHours(hours: number | null | undefined): string {
  if (hours == null) return "—";
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(hours)} hrs`;
}
