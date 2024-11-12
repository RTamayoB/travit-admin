import type { Meta, StoryObj } from "@storybook/react";

import CreateAgencyLayout from "./CreateAgencyLayout";
import { mockupAgencies, mockupStops } from "@/ui/mockups";

const meta: Meta<typeof CreateAgencyLayout> = {
  title: "Design System/Dashboard/Agencies/CreateAgencyLayout",
  component: CreateAgencyLayout,
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
type Story = StoryObj<typeof CreateAgencyLayout>;

export const Layout: Story = {
  args: {},
};
