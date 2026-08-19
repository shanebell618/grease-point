import Chip from "@mui/material/Chip";

export type StatusBadgeColor = "success" | "warning" | "error" | "default";

interface StatusBadgeProps {
  label: string;
  color: StatusBadgeColor;
}

export const StatusBadge = ({ label, color }: StatusBadgeProps) => {
  return <Chip label={label} color={color} size="small" />;
};
