"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDeleteEquipmentMutation } from "../hooks";

interface DeleteEquipmentButtonProps {
  id: string;
  name: string;
}

export const DeleteEquipmentButton = ({
  id,
  name,
}: DeleteEquipmentButtonProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const deleteMutation = useDeleteEquipmentMutation();

  const handleConfirm = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        setOpen(false);
        router.push("/equipment");
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
            This permanently removes the equipment record. This can&apos;t be
            undone.
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
