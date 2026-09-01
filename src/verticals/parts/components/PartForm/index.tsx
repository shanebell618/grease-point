"use client";

import { Controller, useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import type { CreatePartInput } from "@/server/schemas/parts/createPartInputSchema";
import type { Part } from "@/verticals/parts/types";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { createPartInputSchema } from "@/server/schemas/parts/createPartInputSchema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type PartFormValues = z.input<typeof createPartInputSchema>;

interface PartFormProps {
  part?: Part;
  onSubmit: (data: CreatePartInput) => void;
  submitLabel: string;
  isSubmitting?: boolean;
}

export const PartForm = ({
  part,
  onSubmit,
  submitLabel,
  isSubmitting,
}: PartFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PartFormValues, unknown, CreatePartInput>({
    resolver: zodResolver(createPartInputSchema),
    defaultValues: {
      sku: part?.sku ?? "",
      name: part?.name ?? "",
      quantityOnHand: part?.quantityOnHand ?? 0,
      reorderThreshold: part?.reorderThreshold ?? 0,
      unitCost: part?.unitCost ?? null,
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
        name="sku"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="SKU"
            required
            error={!!errors.sku}
            helperText={errors.sku?.message}
          />
        )}
      />

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
        name="quantityOnHand"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Quantity on hand"
            required
            slotProps={{ input: { inputProps: { min: 0, step: "1" } } }}
            error={!!errors.quantityOnHand}
            helperText={errors.quantityOnHand?.message}
          />
        )}
      />

      <Controller
        name="reorderThreshold"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="number"
            label="Reorder threshold"
            required
            slotProps={{ input: { inputProps: { min: 0, step: "1" } } }}
            error={!!errors.reorderThreshold}
            helperText={errors.reorderThreshold?.message}
          />
        )}
      />

      <Controller
        name="unitCost"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            type="number"
            label="Unit cost"
            slotProps={{ input: { inputProps: { min: 0, step: "0.01" } } }}
            error={!!errors.unitCost}
            helperText={errors.unitCost?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </Stack>
  );
};
