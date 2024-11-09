import type { Meta, StoryObj } from "@storybook/react";

import StopEditMap from "./StopEditMap";
import { mockupStops } from "@/ui/mockups";
import { LatLng } from "leaflet";

const meta: Meta<typeof StopEditMap> = {
  title: "Design System/Sections/Maps/StopEditMap",
  component: StopEditMap,
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
type Story = StoryObj<typeof StopEditMap>;

export const Default: Story = {
  args: {
    marker: new LatLng(20.6797, 256.6700),
  },
};
