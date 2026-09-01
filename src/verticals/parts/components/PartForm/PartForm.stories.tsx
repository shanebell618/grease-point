import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PartForm } from "./";

const meta: Meta<typeof PartForm> = {
  title: "Parts/PartForm",
  component: PartForm,
  parameters: { layout: "padded" },
  args: {
    onSubmit: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof PartForm>;

export const Create: Story = {
  args: {
    submitLabel: "Add Part",
  },
};

export const Edit: Story = {
  args: {
    submitLabel: "Save Changes",
    part: {
      id: "part-1",
      sku: "OF-100",
      name: "Oil Filter",
      quantityOnHand: 24,
      reorderThreshold: 5,
      unitCost: 12.5,
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:00:00.000Z",
    },
  },
};

export const Submitting: Story = {
  args: {
    submitLabel: "Add Part",
    isSubmitting: true,
  },
};
