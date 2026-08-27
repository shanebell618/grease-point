"use client";

import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import { MaintenanceForm } from "@/verticals/maintenance/components/MaintenanceForm";
import type { Maintenance } from "@/verticals/maintenance/types";
import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { useUpdateMaintenanceMutation } from "@/verticals/maintenance/hooks";

type EditableMaintenance = Pick<
  Maintenance,
  | "id"
  | "equipmentId"
  | "description"
  | "status"
  | "serviceDate"
  | "nextDueDate"
  | "cost"
  | "nextDueHours"
>;

interface EditMaintenanceDialogProps {
  maintenance: EditableMaintenance;
  open: boolean;
  onClose: () => void;
}

export const EditMaintenanceDialog = ({
  maintenance,
  open,
  onClose,
}: EditMaintenanceDialogProps) => {
  const updateMutation = useUpdateMaintenanceMutation(maintenance.id);

  const handleSubmit = (data: CreateMaintenanceInput) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Maintenance</DialogTitle>
      <DialogContent sx={{ "&&": { pt: 3 } }}>
        {updateMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Couldn&apos;t save these changes. Check the fields and try again.
          </Alert>
        )}
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
          }}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          isSubmitting={updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
