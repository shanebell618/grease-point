"use client";

import {
  useMaintenanceQuery,
  useUpdateMaintenanceMutation,
} from "@/verticals/maintenance/hooks";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MaintenanceForm } from "@/verticals/maintenance/components/MaintenanceForm";
import dayjs from "dayjs";
import { useToasts } from "@/common/hooks/useToasts";

interface EditMaintenanceDialogProps {
  maintenanceRecordId: string;
  open: boolean;
  onClose: () => void;
}

export const EditMaintenanceDialog = ({
  maintenanceRecordId,
  open,
  onClose,
}: EditMaintenanceDialogProps) => {
  const {
    data: maintenance,
    isPending,
    isError,
  } = useMaintenanceQuery(maintenanceRecordId);
  const updateMutation = useUpdateMaintenanceMutation(maintenanceRecordId);
  const { successToast, errorToast } = useToasts();

  const handleSubmit = (data: CreateMaintenanceInput) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        successToast("Maintenance record updated");
        onClose();
      },
      onError: () => {
        errorToast(
          "Couldn't save these changes. Check the fields and try again.",
        );
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Maintenance</DialogTitle>
      <DialogContent sx={{ "&&": { pt: 3 } }}>
        {isPending && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress aria-label="Loading maintenance record" />
          </Box>
        )}
        {isError && (
          <Alert severity="error">
            Couldn&apos;t load this record. It may have been deleted.
          </Alert>
        )}
        {maintenance && (
          <MaintenanceForm
            equipmentId={maintenance.equipmentId}
            defaultValues={{
              description: maintenance.description,
              status: maintenance.status,
              serviceDate: dayjs(maintenance.serviceDate),
              nextDueDate: maintenance.nextDueDate
                ? dayjs(maintenance.nextDueDate)
                : null,
              cost: maintenance.cost,
              nextDueHours: maintenance.nextDueHours,
              partsUsed: maintenance.partsUsed ?? [],
            }}
            onSubmit={handleSubmit}
            submitLabel="Save Changes"
            isSubmitting={updateMutation.isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
