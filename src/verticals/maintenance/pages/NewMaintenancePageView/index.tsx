"use client";

import Container from "@mui/material/Container";
import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { MaintenanceForm } from "@/verticals/maintenance/components/MaintenanceForm";
import Typography from "@mui/material/Typography";
import { useCreateMaintenanceMutation } from "@/verticals/maintenance/hooks";
import { useRouter } from "next/navigation";
import { useToasts } from "@/common/hooks/useToasts";

export const NewMaintenancePageView = () => {
  const router = useRouter();
  const createMutation = useCreateMaintenanceMutation();
  const { successToast, errorToast } = useToasts();

  const handleSubmit = (data: CreateMaintenanceInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        successToast("Maintenance record created");
        router.push("/maintenance");
      },
      onError: () => {
        errorToast(
          "Unable to save maintenance record. Check the fields and try again.",
        );
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Add Maintenance Record
      </Typography>
      <MaintenanceForm
        onSubmit={handleSubmit}
        submitLabel="Create Maintenance Record"
        isSubmitting={createMutation.isPending}
      />
    </Container>
  );
};
