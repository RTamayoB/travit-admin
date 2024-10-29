import type { Meta, StoryObj } from "@storybook/react";

import LinkButton from "./LinkButton";

const meta: Meta<typeof LinkButton> = {
  title: "Design System/Components/LinkButton",
  component: LinkButton,
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
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  args: {
    label: "LinkButton",
    href: "https://travitgit.github.io/",
  },
};
