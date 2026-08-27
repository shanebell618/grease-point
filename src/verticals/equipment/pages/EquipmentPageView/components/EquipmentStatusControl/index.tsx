"use client";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { StatusBadge } from "@/common/components/StatusBadge";
import { EQUIPMENT_STATUS_CONFIG } from "@/verticals/equipment/components/EquipmentStatusBadge";
import type { EquipmentStatus } from "@/verticals/equipment/types";
import { useUpdateEquipmentMutation } from "@/verticals/equipment/hooks";

interface EquipmentStatusControlProps {
  equipmentId: string;
  status: EquipmentStatus;
}

// Deliberately manual rather than derived from maintenance records — a
// maintenance record's own status (scheduled/in progress/waiting on
// parts) says how far along the work is, not whether the equipment is
// usable in the meantime (an oil change vs. a safety-system repair can
// sit at the same maintenance status with opposite real-world impact).
// This lets whoever's looking at the equipment make that call directly.
export const EquipmentStatusControl = ({
  equipmentId,
  status,
}: EquipmentStatusControlProps) => {
  const updateMutation = useUpdateEquipmentMutation(equipmentId);

  const handleChange = (event: SelectChangeEvent<EquipmentStatus>) => {
    const nextStatus = event.target.value as EquipmentStatus;
    if (nextStatus === status) return;
    updateMutation.mutate({ status: nextStatus });
  };

  return (
    <>
      <Select<EquipmentStatus>
        value={status}
        onChange={handleChange}
        disabled={updateMutation.isPending}
        variant="standard"
        disableUnderline
        aria-label="Equipment status"
        renderValue={(value) => {
          const { label, color } = EQUIPMENT_STATUS_CONFIG[value];
          return <StatusBadge label={label} color={color} />;
        }}
        sx={{
          "& .MuiSelect-select": { py: 0, display: "flex" },
        }}
      >
        {Object.entries(EQUIPMENT_STATUS_CONFIG).map(([value, config]) => (
          <MenuItem key={value} value={value}>
            <StatusBadge label={config.label} color={config.color} />
          </MenuItem>
        ))}
      </Select>
      {updateMutation.isError && (
        <Typography
          color="error"
          variant="caption"
          sx={{ display: "block", mt: 0.5 }}
        >
          Couldn&apos;t update status. Try again.
        </Typography>
      )}
    </>
  );
};
