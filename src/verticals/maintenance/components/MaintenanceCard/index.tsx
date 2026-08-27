"use client";

import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";
import type { Maintenance } from "@/verticals/maintenance/types";
import { EditMaintenanceDialog } from "@/verticals/maintenance/components/EditMaintenanceDialog";
import { MaintenanceStatusBadge } from "@/verticals/maintenance/components/MaintenanceStatusBadge";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { formatCurrency } from "@/common/utils/formatters/formatCurrency";
import { formatDate } from "@/common/utils/formatters/formatDate";

interface MaintenanceCardProps {
  maintenance: Pick<
    Maintenance,
    | "id"
    | "equipmentId"
    | "description"
    | "status"
    | "serviceDate"
    | "completedAt"
    | "nextDueDate"
    | "cost"
    | "nextDueHours"
  >;
  equipmentName?: string;
}

export const MaintenanceCard = ({
  maintenance,
  equipmentName,
}: MaintenanceCardProps) => {
  const [open, setOpen] = useState(false);
  const isComplete = maintenance.status === "COMPLETE";
  const dateLabel = isComplete ? "Completed" : "Service date";
  const date = isComplete ? maintenance.completedAt : maintenance.serviceDate;

  return (
    <>
      <Card
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{ cursor: "pointer" }}
      >
        <CardContent>
          <Stack
            direction="row"
            spacing={1}
            sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
          >
            <Typography
              variant="h6"
              component="h3"
              noWrap
              title={maintenance.description}
            >
              {maintenance.description}
            </Typography>
            <MaintenanceStatusBadge status={maintenance.status} />
          </Stack>
          {equipmentName && (
            <Link
              href={`/equipment/${maintenance.equipmentId}`}
              variant="body2"
              underline="hover"
              onClick={(event) => event.stopPropagation()}
              sx={{ display: "inline-block" }}
            >
              {equipmentName}
            </Link>
          )}
          <Typography variant="body2" color="text.secondary">
            {dateLabel}: {formatDate(date)}
          </Typography>
          {maintenance.cost != null && (
            <Typography variant="body2" color="text.secondary">
              Cost: {formatCurrency(maintenance.cost)}
            </Typography>
          )}
        </CardContent>
      </Card>
      <EditMaintenanceDialog
        maintenance={maintenance}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};
