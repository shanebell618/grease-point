"use client";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGridTable } from "@/common/components/DataGridTable";
import { EditMaintenanceDialog } from "@/verticals/maintenance/components/EditMaintenanceDialog";
import Typography from "@mui/material/Typography";
import type { Maintenance } from "@/verticals/maintenance/types";
import { getMaintenanceHistoryColumns } from "./getMaintenanceHistoryColumns";
import { sortMaintenanceByPriority } from "@/verticals/maintenance/utils";
import { useMaintenanceListQuery } from "@/verticals/maintenance/hooks";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface MaintenanceHistoryTableProps {
  equipmentId: string;
}

export const MaintenanceHistoryTable = ({
  equipmentId,
}: MaintenanceHistoryTableProps) => {
  const { data, isPending, isError } = useMaintenanceListQuery(equipmentId);
  const [selectedMaintenance, setSelectedMaintenance] =
    useState<Maintenance | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  return (
    <>
      <DataGridTable
        rows={sortMaintenanceByPriority(data)}
        columns={getMaintenanceHistoryColumns()}
        onRowClick={(params) => setSelectedMaintenance(params.row)}
        initialState={{
          columns: {
            columnVisibilityModel: isMobile
              ? { completedAt: false, cost: false, nextDueDate: false }
              : {},
          },
        }}
      />
      {selectedMaintenance && (
        <EditMaintenanceDialog
          key={selectedMaintenance.id}
          maintenance={selectedMaintenance}
          open
          onClose={() => setSelectedMaintenance(null)}
        />
      )}
    </>
  );
};
