"use client";

import type { CreatePartInput } from "@/server/schemas/parts/createPartInputSchema";
import { DeletePartButton } from "../DeletePartButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import type { Part } from "@/verticals/parts/types";
import { PartForm } from "@/verticals/parts/components/PartForm";
import { useToasts } from "@/common/hooks/useToasts";
import { useUpdatePartMutation } from "@/verticals/parts/hooks";

interface EditPartDialogProps {
  part: Part;
  open: boolean;
  onClose: () => void;
}

export const EditPartDialog = ({
  part,
  open,
  onClose,
}: EditPartDialogProps) => {
  const updateMutation = useUpdatePartMutation(part.id);
  const { successToast, errorToast } = useToasts();

  const handleSubmit = (data: CreatePartInput) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        successToast("Part updated");
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
      <DialogTitle>Edit Part</DialogTitle>
      <DialogContent sx={{ "&&": { pt: 3 } }}>
        <PartForm
          part={part}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          isSubmitting={updateMutation.isPending}
        />
      </DialogContent>
      <DialogActions>
        <DeletePartButton id={part.id} name={part.name} onDeleted={onClose} />
      </DialogActions>
    </Dialog>
  );
};
