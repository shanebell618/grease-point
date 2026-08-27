import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import dayjs from "dayjs";
import { MaintenanceForm } from "./";

const meta: Meta<typeof MaintenanceForm> = {
  title: "Maintenance/MaintenanceForm",
  component: MaintenanceForm,
  parameters: { layout: "padded" },
  args: {
    onSubmit: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof MaintenanceForm>;

export const Create: Story = {
  args: {
    equipmentId: "equip-1",
    submitLabel: "Save",
  },
};

export const Edit: Story = {
  args: {
    equipmentId: "equip-1",
    submitLabel: "Save Changes",
    defaultValues: {
      description: "500-hour service and fluid check",
      status: "SCHEDULED",
      serviceDate: dayjs("2026-08-29"),
      nextDueDate: null,
      cost: 450,
      nextDueHours: null,
    },
  },
};

// No equipmentId means the caller hasn't already scoped this form to one
// piece of equipment — e.g. the standalone "New Maintenance Record" page,
// versus LogMaintenanceButton, which always passes one in. That flips on
// the searchable equipment Autocomplete at the top of the form.
export const WithoutEquipmentId: Story = {
  args: {
    submitLabel: "Save",
  },
};
