"use client";

import type { Control, FieldErrors } from "react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";

import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { CreateMaintenanceInput } from "@/server/schemas/maintenance/createMaintenanceInputSchema";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import type { MaintenanceFormValues } from "../..";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { usePartsListQuery } from "@/verticals/parts/hooks";

interface PartsUsedFieldsProps {
  control: Control<MaintenanceFormValues, unknown, CreateMaintenanceInput>;
  errors: FieldErrors<MaintenanceFormValues>;
}

export const PartsUsedFields = ({ control, errors }: PartsUsedFieldsProps) => {
  const { data: parts } = usePartsListQuery();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "partsUsed",
  });

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Parts used</Typography>

      {fields.map((field, index) => (
        <Stack
          key={field.id}
          direction="row"
          spacing={2}
          sx={{ alignItems: "flex-start" }}
        >
          <Controller
            name={`partsUsed.${index}.partId`}
            control={control}
            render={({ field: partIdField }) => (
              <Autocomplete
                sx={{ flex: 2 }}
                options={parts ?? []}
                getOptionLabel={(option) => `${option.name} (${option.sku})`}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={
                  parts?.find((part) => part.id === partIdField.value) ?? null
                }
                onChange={(_event, selected) =>
                  partIdField.onChange(selected?.id ?? "")
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Part"
                    required
                    error={!!errors.partsUsed?.[index]?.partId}
                    helperText={errors.partsUsed?.[index]?.partId?.message}
                  />
                )}
              />
            )}
          />

          <Controller
            name={`partsUsed.${index}.quantityUsed`}
            control={control}
            render={({ field: quantityField }) => (
              <TextField
                {...quantityField}
                sx={{ flex: 1 }}
                type="number"
                label="Quantity"
                required
                slotProps={{ input: { inputProps: { min: 1, step: "1" } } }}
                error={!!errors.partsUsed?.[index]?.quantityUsed}
                helperText={errors.partsUsed?.[index]?.quantityUsed?.message}
              />
            )}
          />

          <IconButton
            type="button"
            aria-label="Remove part"
            onClick={() => remove(index)}
            sx={{ mt: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}

      <Box>
        <Button
          type="button"
          startIcon={<AddIcon />}
          onClick={() => append({ partId: "", quantityUsed: 1 })}
        >
          Add part
        </Button>
      </Box>
    </Stack>
  );
};
