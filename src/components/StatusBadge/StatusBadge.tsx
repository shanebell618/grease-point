import Chip from "@mui/material/Chip";
import type { EquipmentStatus } from "@/features/equipment/types";

const STATUS_CONFIG: Record<
  EquipmentStatus,
  { label: string; color: "success" | "warning" | "error" | "default" }
> = {
  ACTIVE: { label: "Active", color: "success" },
  MAINTENANCE: { label: "Maintenance", color: "warning" },
  RETIRED: { label: "Retired", color: "default" },
  OUT_OF_SERVICE: { label: "Out of Service", color: "error" },
};

interface StatusBadgeProps {
  status: EquipmentStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { label, color } = STATUS_CONFIG[status];
  return <Chip label={label} color={color} size="small" />;
};
