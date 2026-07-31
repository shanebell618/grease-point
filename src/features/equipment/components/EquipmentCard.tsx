import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { StatusBadge } from "@/components/StatusBadge/StatusBadge";
import { formatEngineHours } from "../utils";
import type { Equipment } from "../types";

interface EquipmentCardProps {
  equipment: Pick<
    Equipment,
    "name" | "serialNumber" | "status" | "engineHours"
  >;
  href?: string;
}

export const EquipmentCard = ({ equipment, href }: EquipmentCardProps) => {
  const content = (
    <CardContent>
      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
      >
        <Typography variant="h6" component="h3" noWrap title={equipment.name}>
          {equipment.name}
        </Typography>
        <StatusBadge status={equipment.status} />
      </Stack>
      <Typography variant="body2" color="text.secondary">
        S/N {equipment.serialNumber}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {formatEngineHours(equipment.engineHours)}
      </Typography>
    </CardContent>
  );

  return (
    <Card variant="outlined">
      {href ? <CardActionArea href={href}>{content}</CardActionArea> : content}
    </Card>
  );
};
