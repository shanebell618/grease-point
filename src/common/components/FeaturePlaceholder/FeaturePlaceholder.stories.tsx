import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { FeaturePlaceholder } from "./";

const meta: Meta<typeof FeaturePlaceholder> = {
  title: "Components/FeaturePlaceholder",
  component: FeaturePlaceholder,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof FeaturePlaceholder>;

export const Parts: Story = {
  args: {
    title: "Parts",
    description:
      "Track parts on hand, reorder points, and usage across your fleet.",
    plannedFeatures: [
      "Part catalog with quantity on hand",
      "Low-stock alerts",
      "Usage history tied to maintenance records",
    ],
    docsPath: "src/verticals/parts/README.md",
  },
};

export const WithoutDocsPath: Story = {
  args: {
    title: "Dashboard",
    description: "An at-a-glance summary once Maintenance and Analytics exist.",
    plannedFeatures: [
      "Fleet status breakdown",
      "Upcoming and overdue maintenance",
      "Recent activity feed",
    ],
  },
};
