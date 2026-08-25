"use client";

import { Controller, useForm } from "react-hook-form";
import {
  MAINTENANCE_STATUSES,
  createMaintenanceInputSchema,
} from "@/server/schemas/maintenance/createMaintenanceInputSchema";

import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import type { Resolver } from "react-hook-form";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEquipmentListQuery } from "@/verticals/equipment/hooks";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Same z.input<> approach as EquipmentFormValues, with serviceDate/
// nextDueDate overridden to Dayjs — that's what the DatePicker actually
// controls, and what a caller passing defaultValues (e.g. the edit page)
// is responsible for providing.
type MaintenanceFormValues = Omit<
  z.input<typeof createMaintenanceInputSchema>,
  "serviceDate" | "nextDueDate"
> & {
  serviceDate: Dayjs | null;
  nextDueDate: Dayjs | null;
};

const STATUS_LABELS: Record<(typeof MAINTENANCE_STATUSES)[number], string> = {
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In progress",
  WAITING_ON_PARTS: "Waiting on parts",
  COMPLETE: "Complete",
};

interface MaintenanceFormProps {
  equipmentId?: string;
  defaultValues?: Partial<MaintenanceFormValues>;
  onSubmit: (data: CreateMaintenanceInput) => void;
  submitLabel: string;
  isSubmitting?: boolean;
}

export const MaintenanceForm = ({
  equipmentId,
  defaultValues,
  onSubmit,
  submitLabel,
  isSubmitting,
}: MaintenanceFormProps) => {
  const { data: equipmentList, isPending: isEquipmentListPending } =
    useEquipmentListQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MaintenanceFormValues, unknown, CreateMaintenanceInput>({
    // zodResolver infers performedAt/nextDueDate as `unknown` — that's
    // z.coerce.date()'s declared input type, since a coercing schema is
    // built to accept literally anything. We know they're always a Dayjs
    // object at runtime (that's the only thing DatePicker ever puts
    // there), so this cast bridges the resolver's necessarily-loose
    // inferred type to what MaintenanceFormValues actually declares. Same
    // category of boundary cast as src/lib/prisma/mockClient.ts.
    resolver: zodResolver(createMaintenanceInputSchema) as Resolver<
      MaintenanceFormValues,
      unknown,
      CreateMaintenanceInput
    >,
    defaultValues: {
      equipmentId: equipmentId ?? "",
      serviceDate: null,
      description: "",
      status: "SCHEDULED",
      cost: null,
      nextDueHours: null,
      nextDueDate: null,
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
      {!equipmentId && (
        <Controller
          name="equipmentId"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={equipmentList ?? []}
              loading={isEquipmentListPending}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={
                equipmentList?.find((item) => item.id === field.value) ?? null
              }
              onChange={(_event, selected) =>
                field.onChange(selected?.id ?? "")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Equipment"
                  required
                  error={!!errors.equipmentId}
                  helperText={errors.equipmentId?.message}
                />
              )}
            />
          )}
        />
      )}

      <Controller
        name="serviceDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Service date"
            value={field.value}
            onChange={field.onChange}
            slotProps={{
              textField: {
                required: true,
                error: !!errors.serviceDate,
                helperText: errors.serviceDate?.message,
              },
            }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            required
            multiline
            minRows={2}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <TextField {...field} select label="Status" required>
            {MAINTENANCE_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {STATUS_LABELS[status]}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="cost"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            type="number"
            label="Cost"
            slotProps={{ input: { inputProps: { min: 0, step: "0.01" } } }}
            error={!!errors.cost}
            helperText={errors.cost?.message}
          />
        )}
      />

      <Controller
        name="nextDueHours"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value ?? ""}
            type="number"
            label="Next due (operating hours)"
            slotProps={{ input: { inputProps: { min: 0, step: "0.1" } } }}
            error={!!errors.nextDueHours}
            helperText={errors.nextDueHours?.message}
          />
        )}
      />

      <Controller
        name="nextDueDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            label="Next due date"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Button type="submit" variant="contained" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </Stack>
  );
};
