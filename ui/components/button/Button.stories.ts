import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Design System/Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?type=design&node-id=6-64150&mode=design&t=qmEk3xCCXNU73aDo-11",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    label: "Button",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    label: "Button",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    label: "Button",
    size: "large",
  },
};

export const WithLeadIcon: Story = {
  args: {
    leadIconUrl: "/images/user.svg",
    label: "Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Button",
  },
};
