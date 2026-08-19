"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { MaintenanceCard } from "@/verticals/maintenance/components/MaintenanceCard";
import Typography from "@mui/material/Typography";
import { useEquipmentListQuery } from "@/verticals/equipment/hooks";
import { useMaintenanceListQuery } from "@/verticals/maintenance/hooks";

export const MaintenanceList = () => {
  const {
    data: maintenanceList,
    isPending: isMaintenancePending,
    isError: isMaintenanceError,
  } = useMaintenanceListQuery();
  const { data: equipmentList, isPending: isEquipmentPending } =
    useEquipmentListQuery();

  if (isMaintenancePending || isEquipmentPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress aria-label="Loading maintenance records" />
      </Box>
    );
  }

  if (isMaintenanceError) {
    return (
      <Alert severity="error">
        Unable to load maintenance records. Try refreshing the page.
      </Alert>
    );
  }

  if (maintenanceList.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 4 }}>
        No maintenance records yet. Log your first service to get started.
      </Typography>
    );
  }

  const equipmentNameById = new Map(
    (equipmentList ?? []).map((equipment) => [equipment.id, equipment.name]),
  );

  return (
    <Grid container spacing={2}>
      {maintenanceList.map((maintenance) => (
        <Grid key={maintenance.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <MaintenanceCard
            maintenance={maintenance}
            equipmentName={
              equipmentNameById.get(maintenance.equipmentId) ??
              "Unknown equipment"
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};
