"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { DataGridTable } from "@/common/components/DataGridTable";
import { useMaintenanceListQuery } from "@/verticals/maintenance/hooks";
import { getMaintenanceHistoryColumns } from "./getMaintenanceHistoryColumns";

interface MaintenanceHistoryTableProps {
  equipmentId: string;
}

export const MaintenanceHistoryTable = ({
  equipmentId,
}: MaintenanceHistoryTableProps) => {
  const { data, isPending, isError } = useMaintenanceListQuery(equipmentId);

  if (isPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress aria-label="Loading maintenance history" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Couldn&apos;t load maintenance history. Try refreshing the page.
      </Alert>
    );
  }

  if (data.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 2 }}>
        No maintenance recorded yet.
      </Typography>
    );
  }

  return <DataGridTable rows={data} columns={getMaintenanceHistoryColumns()} />;
};
