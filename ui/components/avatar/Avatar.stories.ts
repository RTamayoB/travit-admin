import type { Meta, StoryObj } from "@storybook/react";

import Avatar from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Design System/Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/design/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?node-id=32-62420&t=4Z9ISfcB0Vr7Tzss-1",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const ExtraSmall: Story = {
  args: {
    src: "https://www.w3schools.com/w3images/avatar6.png",
    size: "extra-small",
  },
};

export const Small: Story = {
  args: {
    src: "https://www.w3schools.com/w3images/avatar6.png",
    size: "small",
  },
};

export const Regular: Story = {
  args: {
    src: "https://www.w3schools.com/w3images/avatar6.png",
    size: "regular",
  },
};

export const Medium: Story = {
  args: {
    src: "https://www.w3schools.com/w3images/avatar6.png",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    src: "https://www.w3schools.com/w3images/avatar6.png",
    size: "large",
  },
};

export const ExtraLarge: Story = {
  args: {
    src: "https://www.w3schools.com/w3images/avatar6.png",
    size: "extra-large",
  },
};
