import type { Meta, StoryObj } from "@storybook/react";

import Routes from "./RoutesMap";
import { mockupRoutes } from "@/ui/mockups";
import RoutesMap from "./RoutesMap";

const meta: Meta<typeof Routes> = {
  title: "Design System/Sections/Maps/RoutesMap",
  component: Routes,
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
type Story = StoryObj<typeof RoutesMap>;

export const Default: Story = {
  args: {
    routes: mockupRoutes,
  },
};
