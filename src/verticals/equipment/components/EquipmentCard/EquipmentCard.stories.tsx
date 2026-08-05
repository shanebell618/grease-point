import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EquipmentCard } from "./";

const meta: Meta<typeof EquipmentCard> = {
  title: "Equipment/EquipmentCard",
  component: EquipmentCard,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof EquipmentCard>;

export const Default: Story = {
  args: {
    equipment: {
      name: "CAT 320 Excavator",
      vin: "CAT0320XJDR12345",
      status: "ACTIVE",
      operatingHours: 4231.5,
    },
    href: "#",
  },
};

export const LongName: Story = {
  args: {
    equipment: {
      name: "John Deere 850L Crawler Dozer with Ripper Attachment",
      vin: "JD850L998877",
      status: "MAINTENANCE",
      operatingHours: 12034,
    },
    href: "#",
  },
};

export const MissingOperatingHours: Story = {
  args: {
    equipment: {
      name: "Bobcat S650 Skid Steer",
      vin: "BC-S650-0042",
      status: "OUT_OF_SERVICE",
      operatingHours: null,
    },
    href: "#",
  },
};
