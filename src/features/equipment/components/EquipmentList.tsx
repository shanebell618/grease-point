"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEquipmentListQuery } from "../hooks";
import { EquipmentCard } from "./EquipmentCard";

export const EquipmentList = () => {
  const { data, isPending, isError } = useEquipmentListQuery();

  if (isPending) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress aria-label="Loading equipment" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Couldn&apos;t load equipment. Try refreshing the page.
      </Alert>
    );
  }

  if (data.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 4 }}>
        No equipment yet. Add your first machine to get started.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {data.map((equipment) => (
        <Grid key={equipment.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <EquipmentCard
            equipment={equipment}
            href={`/equipment/${equipment.id}`}
          />
        </Grid>
      ))}
    </Grid>
  );
};
