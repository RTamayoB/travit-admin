import type { Meta, StoryObj } from "@storybook/react";

import EditAgencyLayout from "./EditAgencyLayout";
import { mockupAgencies, mockupLines, mockupStops } from "@/ui/mockups";

const meta: Meta<typeof EditAgencyLayout> = {
  title: "Design System/Dashboard/Agencies/EditAgencyLayout",
  component: EditAgencyLayout,
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
type Story = StoryObj<typeof EditAgencyLayout>;

export const Layout: Story = {
  args: {
    agency: mockupAgencies[0],
  },
};
