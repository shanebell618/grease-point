"use client";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MaintenanceForm } from "@/verticals/maintenance/components/MaintenanceForm";
import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { useCreateMaintenanceMutation } from "@/verticals/maintenance/hooks";

interface LogMaintenanceButtonProps {
  equipmentId: string;
}

export const LogMaintenanceButton = ({
  equipmentId,
}: LogMaintenanceButtonProps) => {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateMaintenanceMutation();

  const handleSubmit = (data: CreateMaintenanceInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
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
        <DialogContent>
          {createMutation.isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Couldn&apos;t save this maintenance record. Check the fields and
              try again.
            </Alert>
          )}
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
