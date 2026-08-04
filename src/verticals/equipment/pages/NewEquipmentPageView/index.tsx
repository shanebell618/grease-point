"use client";

import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import { EquipmentForm } from "@/verticals/equipment/components/EquipmentForm";
import Typography from "@mui/material/Typography";
import type { CreateEquipmentInput } from "@/server/schemas/equipment/createEquipmentInputSchema";
import { useCreateEquipmentMutation } from "@/verticals/equipment/hooks";
import { useRouter } from "next/navigation";

export const NewEquipmentPageView = () => {
  const router = useRouter();
  const createMutation = useCreateEquipmentMutation();

  const handleSubmit = (data: CreateEquipmentInput) => {
    createMutation.mutate(data, {
      onSuccess: (equipment) => {
        router.push(`/equipment/${equipment.id}`);
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Add Equipment
      </Typography>
      {createMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Couldn&apos;t save this equipment. Check the fields and try again.
        </Alert>
      )}
      <EquipmentForm
        onSubmit={handleSubmit}
        submitLabel="Create Equipment"
        isSubmitting={createMutation.isPending}
      />
    </Container>
  );
};
