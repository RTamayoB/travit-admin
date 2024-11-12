import type { Meta, StoryObj } from "@storybook/react";

import AgenciesLayout from "./AgenciesLayout";
import { mockupAgencies } from "@/ui/mockups";

const meta: Meta<typeof AgenciesLayout> = {
  title: "Design System/Dashboard/Agencies/AgenciesLayout",
  component: AgenciesLayout,
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
type Story = StoryObj<typeof AgenciesLayout>;

export const Layout: Story = {
  args: {
    agencies: mockupAgencies,
    totalPages: 1,
  },
};
