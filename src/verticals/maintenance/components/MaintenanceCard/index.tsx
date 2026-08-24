import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { Maintenance } from "@/verticals/maintenance/types";
import { MaintenanceStatusBadge } from "@/verticals/maintenance/components/MaintenanceStatusBadge";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { formatDate } from "@/common/utils/formatters/formatDate";

interface MaintenanceCardProps {
  maintenance: Pick<Maintenance, "description" | "status" | "performedAt">;
  equipmentName?: string;
}

export const MaintenanceCard = ({
  maintenance,
  equipmentName,
}: MaintenanceCardProps) => {
  return (
    <Card variant="outlined">
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
        <Typography variant="body2" color="text.secondary">
          {equipmentName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(maintenance.performedAt)}
        </Typography>
      </CardContent>
    </Card>
  );
};
