import type { Meta, StoryObj } from "@storybook/react";

import LineForm from "./LineForm";
import { mockupAgencies, mockupStops } from "@/ui/mockups";

const meta: Meta<typeof LineForm> = {
  title: "Design System/Sections/Forms/LineForm",
  component: LineForm,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/file/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?type=design&node-id=6-64150&mode=design&t=qmEk3xCCXNU73aDo-11",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LineForm>;

export const Default: Story = {
  args: {
    agencies: mockupAgencies,
    stops: mockupStops,
    submitButtonText: "Crear Concesionaria",
  },
};
