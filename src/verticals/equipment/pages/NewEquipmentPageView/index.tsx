"use client";

import Container from "@mui/material/Container";
import { EquipmentForm } from "@/verticals/equipment/components/EquipmentForm";
import Typography from "@mui/material/Typography";
import type { CreateEquipmentInput } from "@/server/schemas/equipment/createEquipmentInputSchema";
import { useCreateEquipmentMutation } from "@/verticals/equipment/hooks";
import { useRouter } from "next/navigation";
import { useToasts } from "@/common/hooks/useToasts";

export const NewEquipmentPageView = () => {
  const router = useRouter();
  const createMutation = useCreateEquipmentMutation();
  const { successToast, errorToast } = useToasts();

  const handleSubmit = (data: CreateEquipmentInput) => {
    createMutation.mutate(data, {
      onSuccess: (equipment) => {
        successToast("Equipment added");
        router.push(`/equipment/${equipment.id}`);
      },
      onError: () => {
        errorToast(
          "Couldn't save this equipment. Check the fields and try again.",
        );
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Add Equipment
      </Typography>
      <EquipmentForm
        onSubmit={handleSubmit}
        submitLabel="Create Equipment"
        isSubmitting={createMutation.isPending}
      />
    </Container>
  );
};
