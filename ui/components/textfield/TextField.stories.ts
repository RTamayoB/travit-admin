import type { Meta, StoryObj } from "@storybook/react";

import TextField from "./TextField";

const meta: Meta<typeof TextField> = {
  title: 'Design System/Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: "https://www.figma.com/design/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?node-id=159-7410&t=4Z9ISfcB0Vr7Tzss-1'"
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: "Placeholder"
  },
};

export const Small: Story = {
  args: {
    label: "Placeholder",
    size: "small"
  },
};

export const Medium: Story = {
  args: {
    label: "Placeholder",
    size: "medium"
  },
};

export const Large: Story = {
  args: {
    label: "Placeholder",
    size: 'large'
  },
};

export const WithLeadIcon: Story = {
  args: {
    label: "Placeholder",
    leadIconUrl: '/images/user.svg'
  },
};

export const Disabled: Story = {
  args: {
    label: "Placeholder",
    disabled: true
  },
};
