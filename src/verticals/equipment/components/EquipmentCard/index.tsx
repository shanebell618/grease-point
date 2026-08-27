import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import type { Equipment } from "@/verticals/equipment/types";
import Stack from "@mui/material/Stack";
import { EquipmentStatusBadge } from "@/verticals/equipment/components/EquipmentStatusBadge";
import Typography from "@mui/material/Typography";
import { formatOperatingHours } from "@/verticals/equipment/utils";

interface EquipmentCardProps {
  equipment: Pick<Equipment, "name" | "vin" | "status" | "operatingHours">;
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
        <EquipmentStatusBadge status={equipment.status} />
      </Stack>
      <Typography variant="body2" color="text.secondary">
        VIN {equipment.vin}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {formatOperatingHours(equipment.operatingHours)}
      </Typography>
    </CardContent>
  );

  return (
    <Card variant="outlined">
      {href ? <CardActionArea href={href}>{content}</CardActionArea> : content}
    </Card>
  );
};
