import type { Meta, StoryObj } from "@storybook/react";

import StopForm from "./StopForm";
import { mockupStops } from "@/ui/mockups";

const meta: Meta<typeof StopForm> = {
  title: "Design System/Sections/Forms/StopForm",
  component: StopForm,
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
type Story = StoryObj<typeof StopForm>;

export const Default: Story = {
  args: {
    submitButtonText: "Crear Parada",
  },
};
