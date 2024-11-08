import type { Meta, StoryObj } from "@storybook/react";

import LineEditMap from "./LineEditMap";
import { mockupLines, mockupStops } from "@/ui/mockups";

const meta: Meta<typeof LineEditMap> = {
  title: "Design System/Sections/Maps/LineEditMap",
  component: LineEditMap,
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
type Story = StoryObj<typeof LineEditMap>;

export const Default: Story = {
  args: {
    stops: mockupStops,
    routePoints: mockupLines[0].route_points,
  },
};
