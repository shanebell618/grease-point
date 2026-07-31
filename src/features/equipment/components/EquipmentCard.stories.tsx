import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EquipmentCard } from "./EquipmentCard";

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
      serialNumber: "CAT0320XJDR12345",
      status: "ACTIVE",
      engineHours: 4231.5,
    },
    href: "#",
  },
};

export const LongName: Story = {
  args: {
    equipment: {
      name: "John Deere 850L Crawler Dozer with Ripper Attachment",
      serialNumber: "JD850L998877",
      status: "MAINTENANCE",
      engineHours: 12034,
    },
    href: "#",
  },
};

export const MissingEngineHours: Story = {
  args: {
    equipment: {
      name: "Bobcat S650 Skid Steer",
      serialNumber: "BC-S650-0042",
      status: "OUT_OF_SERVICE",
      engineHours: null,
    },
    href: "#",
  },
};
