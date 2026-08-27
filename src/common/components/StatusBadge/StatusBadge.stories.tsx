import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StatusBadge } from "./";

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Success: Story = { args: { label: "Active", color: "success" } };
export const Warning: Story = {
  args: { label: "Maintenance", color: "warning" },
};
export const ErrorState: Story = {
  args: { label: "Out of Service", color: "error" },
};
export const Default: Story = { args: { label: "Retired", color: "default" } };
