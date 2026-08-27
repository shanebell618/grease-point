import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EquipmentForm } from "./";

const meta: Meta<typeof EquipmentForm> = {
  title: "Equipment/EquipmentForm",
  component: EquipmentForm,
  parameters: { layout: "padded" },
  args: {
    onSubmit: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof EquipmentForm>;

export const Create: Story = {
  args: {
    submitLabel: "Add Equipment",
  },
};

export const Edit: Story = {
  args: {
    submitLabel: "Save Changes",
    defaultValues: {
      name: "CAT 320 Excavator",
      vin: "CAT0320XJDR12345",
      status: "ACTIVE",
      purchasePrice: 185000,
      operatingHours: 1240.5,
      notes: "Primary excavator for the north yard.",
    },
  },
};

export const Submitting: Story = {
  args: {
    submitLabel: "Add Equipment",
    isSubmitting: true,
  },
};
