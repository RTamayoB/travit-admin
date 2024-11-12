import type { Meta, StoryObj } from "@storybook/react";

import CreateLineLayout from "./CreateLineLayout";
import { mockupAgencies, mockupStops } from "@/ui/mockups";

const meta: Meta<typeof CreateLineLayout> = {
  title: "Design System/Dashboard/Lines/CreateLineLayout",
  component: CreateLineLayout,
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
type Story = StoryObj<typeof CreateLineLayout>;

export const Layout: Story = {
  args: {
    stops: mockupStops,
    agencies: mockupAgencies,
  },
};
