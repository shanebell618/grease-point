"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeletePartMutation } from "@/verticals/parts/hooks";
import { useState } from "react";
import { useToasts } from "@/common/hooks/useToasts";

interface DeletePartButtonProps {
  id: string;
  name: string;
  onDeleted: () => void;
}

export const DeletePartButton = ({
  id,
  name,
  onDeleted,
}: DeletePartButtonProps) => {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeletePartMutation();
  const { successToast, errorToast } = useToasts();

  const handleConfirm = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        successToast(`${name} deleted`);
        setOpen(false);
        onDeleted();
      },
      onError: () => {
        errorToast("Couldn't delete this part. Try again.");
      },
    });
  };

  return (
    <>
      <Button color="error" variant="outlined" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete {name}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This permanently removes the part record. This can&apos;t be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            color="error"
            onClick={handleConfirm}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting…" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
