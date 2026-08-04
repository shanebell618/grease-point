import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StatusBadge } from "./";

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Active: Story = { args: { status: "ACTIVE" } };
export const Maintenance: Story = { args: { status: "MAINTENANCE" } };
export const Retired: Story = { args: { status: "RETIRED" } };
export const OutOfService: Story = { args: { status: "OUT_OF_SERVICE" } };
