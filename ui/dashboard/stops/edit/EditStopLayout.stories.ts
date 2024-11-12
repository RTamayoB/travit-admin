import type { Meta, StoryObj } from "@storybook/react";

import EditStopLayout from "./EditStopLayout";
import { mockupStops } from "@/ui/mockups";

const meta: Meta<typeof EditStopLayout> = {
  title: "Design System/Dashboard/Stops/EditStopLayout",
  component: EditStopLayout,
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
type Story = StoryObj<typeof EditStopLayout>;

export const Layout: Story = {
  args: {
    stop: mockupStops[0],
  },
};
