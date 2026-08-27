import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MaintenanceStatusBadge } from "./";

const meta: Meta<typeof MaintenanceStatusBadge> = {
  title: "Maintenance/MaintenanceStatusBadge",
  component: MaintenanceStatusBadge,
};

export default meta;
type Story = StoryObj<typeof MaintenanceStatusBadge>;

export const Scheduled: Story = { args: { status: "SCHEDULED" } };
export const InProgress: Story = { args: { status: "IN_PROGRESS" } };
export const WaitingOnParts: Story = { args: { status: "WAITING_ON_PARTS" } };
export const Complete: Story = { args: { status: "COMPLETE" } };
