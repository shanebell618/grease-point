import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { NotFoundPage } from "./";

const meta: Meta<typeof NotFoundPage> = {
  title: "Components/NotFoundPage",
  component: NotFoundPage,
};

export default meta;
type Story = StoryObj<typeof NotFoundPage>;

export const Default: Story = {};
