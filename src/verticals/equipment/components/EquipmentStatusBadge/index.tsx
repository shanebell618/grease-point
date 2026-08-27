import { StatusBadge } from "@/common/components/StatusBadge";
import type { StatusBadgeColor } from "@/common/components/StatusBadge";
import type { EquipmentStatus } from "@/verticals/equipment/types";

export const EQUIPMENT_STATUS_CONFIG: Record<
  EquipmentStatus,
  { label: string; color: StatusBadgeColor }
> = {
  ACTIVE: { label: "Active", color: "success" },
  MAINTENANCE: { label: "Maintenance", color: "warning" },
  RETIRED: { label: "Retired", color: "default" },
  OUT_OF_SERVICE: { label: "Out of Service", color: "error" },
};

interface EquipmentStatusBadgeProps {
  status: EquipmentStatus;
}

export const EquipmentStatusBadge = ({ status }: EquipmentStatusBadgeProps) => {
  const { label, color } = EQUIPMENT_STATUS_CONFIG[status];
  return <StatusBadge label={label} color={color} />;
};
