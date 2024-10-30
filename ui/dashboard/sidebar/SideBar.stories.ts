import type { Meta, StoryObj } from "@storybook/react";

import Sidebar from "./SideBar";

const meta: Meta<typeof Sidebar> = {
  title: "Design System/Dashboard/SideBar",
  component: Sidebar,
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
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    userInfo: {
      id: 0,
      full_name: "Rafael",
      username: "RTamayoB",
      role: "Manager",
    },
  },
};
