import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EquipmentStatusBadge } from "./";

const meta: Meta<typeof EquipmentStatusBadge> = {
  title: "Equipment/EquipmentStatusBadge",
  component: EquipmentStatusBadge,
};

export default meta;
type Story = StoryObj<typeof EquipmentStatusBadge>;

export const Active: Story = { args: { status: "ACTIVE" } };
export const Maintenance: Story = { args: { status: "MAINTENANCE" } };
export const Retired: Story = { args: { status: "RETIRED" } };
export const OutOfService: Story = { args: { status: "OUT_OF_SERVICE" } };
