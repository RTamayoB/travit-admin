import type { Meta, StoryObj } from "@storybook/react";

import Logo from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Design System/Components/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/design/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?node-id=251-286&t=gkBaWpYSIz8aB3AM-1",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Logotype: Story = {
  args: {
    variant: "logotype",
  },
};

export const Isotype: Story = {
  args: {
    variant: "isotype",
  },
};
