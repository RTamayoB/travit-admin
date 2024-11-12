import type { Meta, StoryObj } from "@storybook/react";

import AgencyForm from "./AgencyForm";

const meta: Meta<typeof AgencyForm> = {
  title: "Design System/Sections/Forms/AgencyForm",
  component: AgencyForm,
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
type Story = StoryObj<typeof AgencyForm>;

export const Default: Story = {
  args: {
    submitButtonText: "Crear Concesionaria",
  },
};
