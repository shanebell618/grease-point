import type { MaintenanceStatus } from "@/verticals/maintenance/types";
import { StatusBadge } from "@/common/components/StatusBadge";
import type { StatusBadgeColor } from "@/common/components/StatusBadge";

const MAINTENANCE_STATUS_CONFIG: Record<
  MaintenanceStatus,
  { label: string; color: StatusBadgeColor }
> = {
  SCHEDULED: { label: "Scheduled", color: "default" },
  IN_PROGRESS: { label: "In progress", color: "warning" },
  WAITING_ON_PARTS: { label: "Waiting on parts", color: "error" },
  COMPLETE: { label: "Complete", color: "success" },
};

interface MaintenanceStatusBadgeProps {
  status: MaintenanceStatus;
}

export const MaintenanceStatusBadge = ({
  status,
}: MaintenanceStatusBadgeProps) => {
  const { label, color } = MAINTENANCE_STATUS_CONFIG[status];
  return <StatusBadge label={label} color={color} />;
};
