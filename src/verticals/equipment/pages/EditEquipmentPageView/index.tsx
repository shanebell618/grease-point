"use client";

import {
  useEquipmentQuery,
  useUpdateEquipmentMutation,
} from "@/verticals/equipment/hooks";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import type { CreateEquipmentInput } from "@/server/schemas/equipment/createEquipmentInputSchema";
import { EquipmentForm } from "@/verticals/equipment/components/EquipmentForm";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

interface EditEquipmentPageViewProps {
  id: string;
}

export const EditEquipmentPageView = ({ id }: EditEquipmentPageViewProps) => {
  const router = useRouter();
  const { data, isPending, isError } = useEquipmentQuery(id);
  const updateMutation = useUpdateEquipmentMutation(id);

  const handleSubmit = (data: CreateEquipmentInput) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        router.push(`/equipment/${id}`);
      },
    });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Edit Equipment
      </Typography>
      {isPending && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress aria-label="Loading equipment" />
        </Box>
      )}
      {isError && (
        <Alert severity="error">
          Couldn&apos;t load this equipment. It may have been deleted.
        </Alert>
      )}
      {updateMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Couldn&apos;t save these changes. Check the fields and try again.
        </Alert>
      )}
      {data && (
        <EquipmentForm
          defaultValues={{
            name: data.name,
            vin: data.vin ?? "",
            status: data.status,
            purchasePrice: data.purchasePrice,
            operatingHours: data.operatingHours,
            photoUrl: data.photoUrl ?? "",
            notes: data.notes ?? "",
          }}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          isSubmitting={updateMutation.isPending}
        />
      )}
    </Container>
  );
};
