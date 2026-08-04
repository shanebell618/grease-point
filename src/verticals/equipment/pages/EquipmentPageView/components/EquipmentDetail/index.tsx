import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { StatusBadge } from "@/common/components/StatusBadge";
import { formatCurrency } from "@/common/utils/formatters/formatCurrency";
import { formatDate } from "@/common/utils/formatters/formatDate";
import { formatEngineHours } from "@/verticals/equipment/utils";
import type { Equipment } from "@/verticals/equipment/types";
import { DeleteEquipmentButton } from "../DeleteEquipmentButton";

interface DetailFieldProps {
  label: string;
  value: React.ReactNode;
}

const DetailField = ({ label, value }: DetailFieldProps) => (
  <Box>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

interface EquipmentDetailProps {
  equipment: Equipment;
}

export const EquipmentDetail = ({ equipment }: EquipmentDetailProps) => {
  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        spacing={2}
      >
        <Box>
          <Typography variant="h4" component="h1">
            {equipment.name}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <StatusBadge status={equipment.status} />
          </Box>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button href={`/equipment/${equipment.id}/edit`} variant="outlined">
            Edit
          </Button>
          <DeleteEquipmentButton id={equipment.id} name={equipment.name} />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailField label="Serial number" value={equipment.serialNumber} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailField label="VIN" value={equipment.vin ?? "—"} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailField
            label="Engine hours"
            value={formatEngineHours(equipment.engineHours)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailField
            label="Purchase price"
            value={formatCurrency(equipment.purchasePrice)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailField label="Added" value={formatDate(equipment.createdAt)} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DetailField
            label="Last updated"
            value={formatDate(equipment.updatedAt)}
          />
        </Grid>
      </Grid>

      {equipment.notes && (
        <Box>
          <Typography variant="body2" color="text.secondary">
            Notes
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
            {equipment.notes}
          </Typography>
        </Box>
      )}
    </Stack>
  );
};
