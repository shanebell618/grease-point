import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MaintenanceCard } from "./";

const meta: Meta<typeof MaintenanceCard> = {
  title: "Maintenance/MaintenanceCard",
  component: MaintenanceCard,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof MaintenanceCard>;

export const Scheduled: Story = {
  args: {
    maintenance: {
      id: "maint-1",
      equipmentId: "equip-1",
      description: "500-hour service and fluid check",
      status: "SCHEDULED",
      serviceDate: "2026-08-29T00:00:00.000Z",
      completedAt: null,
      nextDueDate: null,
      cost: 450,
      nextDueHours: null,
    },
    equipmentName: "CAT 320 Excavator",
  },
};

export const WaitingOnParts: Story = {
  args: {
    maintenance: {
      id: "maint-2",
      equipmentId: "equip-2",
      description: "Engine rebuild — waiting on replacement parts",
      status: "WAITING_ON_PARTS",
      serviceDate: "2026-08-21T00:00:00.000Z",
      completedAt: null,
      nextDueDate: null,
      cost: null,
      nextDueHours: null,
    },
    equipmentName: "JCB 3CX Backhoe Loader",
  },
};

export const Complete: Story = {
  args: {
    maintenance: {
      id: "maint-3",
      equipmentId: "equip-3",
      description: "Replace hydraulic hose",
      status: "COMPLETE",
      serviceDate: "2026-08-10T00:00:00.000Z",
      completedAt: "2026-08-12T00:00:00.000Z",
      nextDueDate: "2027-02-12T00:00:00.000Z",
      cost: 320,
      nextDueHours: null,
    },
    equipmentName: "Bobcat S650 Skid Steer",
  },
};
