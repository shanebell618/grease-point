import type { Maintenance } from "@/verticals/maintenance/types";

const STATUS_PRIORITY: Record<Maintenance["status"], number> = {
  IN_PROGRESS: 0,
  WAITING_ON_PARTS: 0,
  SCHEDULED: 1,
  COMPLETE: 2,
};

export function sortMaintenanceByPriority<
  T extends Pick<Maintenance, "status" | "serviceDate" | "completedAt">,
>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const priorityDiff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
    if (priorityDiff !== 0) return priorityDiff;

    if (a.status === "COMPLETE") {
      return (
        new Date(b.completedAt ?? b.serviceDate).getTime() -
        new Date(a.completedAt ?? a.serviceDate).getTime()
      );
    }

    return (
      new Date(a.serviceDate).getTime() - new Date(b.serviceDate).getTime()
    );
  });
}
