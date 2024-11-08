import type { Meta, StoryObj } from "@storybook/react";

import LinesMap from "./LinesMap";
import { mockupLines } from "@/ui/mockups";

const meta: Meta<typeof LinesMap> = {
  title: "Design System/Sections/Maps/LinesMap",
  component: LinesMap,
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
type Story = StoryObj<typeof LinesMap>;

export const Default: Story = {
  args: {
    lines: mockupLines,
  },
};
