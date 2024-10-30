import type { Meta, StoryObj } from "@storybook/react";

import LoginForm from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Design System/Login/LoginForm",
  component: LoginForm,
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
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {},
};

export const Message: Story = {
  args: {
    searchParams: { message: "Return message" },
  },
};
