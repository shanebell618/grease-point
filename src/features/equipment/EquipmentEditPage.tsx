"use client";

import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEquipmentQuery, useUpdateEquipmentMutation } from "./hooks";
import { EquipmentForm } from "./components/EquipmentForm";
import type { EquipmentInput } from "./schema";

interface EquipmentEditPageProps {
  id: string;
}

export const EquipmentEditPage = ({ id }: EquipmentEditPageProps) => {
  const router = useRouter();
  const { data, isPending, isError } = useEquipmentQuery(id);
  const updateMutation = useUpdateEquipmentMutation(id);

  const handleSubmit = (data: EquipmentInput) => {
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
            serialNumber: data.serialNumber,
            vin: data.vin ?? "",
            status: data.status,
            purchasePrice: data.purchasePrice,
            engineHours: data.engineHours,
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
