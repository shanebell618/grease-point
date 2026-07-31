"use client";

import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useCreateEquipmentMutation } from "./hooks";
import { EquipmentForm } from "./components/EquipmentForm";
import type { EquipmentInput } from "./schema";

export const EquipmentCreatePage = () => {
  const router = useRouter();
  const createMutation = useCreateEquipmentMutation();

  const handleSubmit = (data: EquipmentInput) => {
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
