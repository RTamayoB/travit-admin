import type { Meta, StoryObj } from "@storybook/react";

import LinesLayout from "./LinesLayout";
import { mockupLines } from "@/ui/mockups";

const meta: Meta<typeof LinesLayout> = {
  title: "Design System/Dashboard/Lines/Layout",
  component: LinesLayout,
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
type Story = StoryObj<typeof LinesLayout>;

export const Layout: Story = {
  args: {
    lines: mockupLines,
    totalPages: 1,
  },
};
