"use client";

import Button from "@mui/material/Button";
import type { CreatePartInput } from "@/server/schemas/parts/createPartInputSchema";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { PartForm } from "@/verticals/parts/components/PartForm";
import { useCreatePartMutation } from "@/verticals/parts/hooks";
import { useState } from "react";
import { useToasts } from "@/common/hooks/useToasts";

export const AddPartDialog = () => {
  const [open, setOpen] = useState(false);
  const createMutation = useCreatePartMutation();
  const { successToast, errorToast } = useToasts();

  const handleSubmit = (data: CreatePartInput) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        successToast("Part added");
        setOpen(false);
      },
      onError: () => {
        errorToast("Couldn't save this part. Check the fields and try again.");
      },
    });
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Part
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Part</DialogTitle>
        <DialogContent sx={{ "&&": { pt: 3 } }}>
          <PartForm
            onSubmit={handleSubmit}
            submitLabel="Add Part"
            isSubmitting={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
