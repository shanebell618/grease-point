"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MaintenanceForm } from "@/verticals/maintenance/components/MaintenanceForm";
import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { useCreateMaintenanceMutation } from "@/verticals/maintenance/hooks";
import { useToasts } from "@/common/hooks/useToasts";

interface LogMaintenanceButtonProps {
  equipmentId: string;
}

export const LogMaintenanceButton = ({
  equipmentId,
}: LogMaintenanceButtonProps) => {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateMaintenanceMutation();
  const { successToast, errorToast } = useToasts();

  const handleSubmit = (data: CreateMaintenanceInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        successToast("Maintenance record logged");
        setOpen(false);
      },
      onError: () => {
        errorToast(
          "Couldn't save this maintenance record. Check the fields and try again.",
        );
      },
    });
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Log Maintenance
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Log Maintenance</DialogTitle>
        <DialogContent sx={{ "&&": { pt: 3 } }}>
          <MaintenanceForm
            equipmentId={equipmentId}
            onSubmit={handleSubmit}
            submitLabel="Save"
            isSubmitting={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
