"use client";

import type { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { EQUIPMENT_STATUSES, equipmentInputSchema } from "../schema";
import type { EquipmentInput } from "../schema";

// The form's raw field values (pre zod-coercion) differ slightly from
// EquipmentInput (post-coercion, e.g. purchasePrice as `unknown` vs number)
// — react-hook-form needs both to type the resolver correctly.
type EquipmentFormValues = z.input<typeof equipmentInputSchema>;

const STATUS_LABELS: Record<(typeof EQUIPMENT_STATUSES)[number], string> = {
  ACTIVE: "Active",
  MAINTENANCE: "Maintenance",
  RETIRED: "Retired",
  OUT_OF_SERVICE: "Out of Service",
};

interface EquipmentFormProps {
  defaultValues?: Partial<EquipmentFormValues>;
  onSubmit: (data: EquipmentInput) => void;
  submitLabel: string;
  isSubmitting?: boolean;
}

export const EquipmentForm = ({
  defaultValues,
  onSubmit,
  submitLabel,
  isSubmitting,
}: EquipmentFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EquipmentFormValues, unknown, EquipmentInput>({
    resolver: zodResolver(equipmentInputSchema),
    defaultValues: {
      name: "",
      serialNumber: "",
      vin: "",
      status: "ACTIVE",
      purchasePrice: null,
      engineHours: null,
      photoUrl: "",
      notes: "",
      ...defaultValues,
    },
  });

  return (
    <Stack
      component="form"
      spacing={3}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            required
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="serialNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Serial number"
            required
            error={!!errors.serialNumber}
            helperText={errors.serialNumber?.message}
          />
        )}
      />

      <Controller
        name="vin"
        control={control}
        render={({ field }) => <TextField {...field} label="VIN" />}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <TextField {...field} select label="Status" required>
            {EQUIPMENT_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {STATUS_LABELS[status]}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="purchasePrice"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            type="number"
            label="Purchase price"
            slotProps={{ input: { inputProps: { min: 0, step: "0.01" } } }}
            error={!!errors.purchasePrice}
            helperText={errors.purchasePrice?.message}
          />
        )}
      />

      <Controller
        name="engineHours"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            type="number"
            label="Engine hours"
            slotProps={{ input: { inputProps: { min: 0, step: "0.1" } } }}
            error={!!errors.engineHours}
            helperText={errors.engineHours?.message}
          />
        )}
      />

      <Controller
        name="photoUrl"
        control={control}
        render={({ field }) => <TextField {...field} label="Photo URL" />}
      />

      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Notes" multiline minRows={3} />
        )}
      />

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </Stack>
  );
};
