"use client";

import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { MaintenanceForm } from "@/verticals/maintenance/components/MaintenanceForm";
import Typography from "@mui/material/Typography";
import { useCreateMaintenanceMutation } from "@/verticals/maintenance/hooks";
import { useRouter } from "next/navigation";

export const NewMaintenancePageView = () => {
  const router = useRouter();
  const createMutation = useCreateMaintenanceMutation();

  const handleSubmit = (data: CreateMaintenanceInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        router.push("/maintenance");
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Add Maintenance Record
      </Typography>
      {createMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Unable to save maintenance record. Check the fields and try again.
        </Alert>
      )}
      <MaintenanceForm
        onSubmit={handleSubmit}
        submitLabel="Create Maintenance Record"
        isSubmitting={createMutation.isPending}
      />
    </Container>
  );
};
