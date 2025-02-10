import type { Meta, StoryObj } from "@storybook/react";

import StopsLayout from "./StopsLayout";
import { mockupStops } from "@/ui/mockups";

const meta: Meta<typeof StopsLayout> = {
  title: "Design System/Dashboard/Stops/StopsLayout",
  component: StopsLayout,
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
type Story = StoryObj<typeof StopsLayout>;

export const Layout: Story = {
  args: {
    stops: mockupStops,
    searchedStops: mockupStops,
  },
};
