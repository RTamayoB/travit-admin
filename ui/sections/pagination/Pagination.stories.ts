import type { Meta, StoryObj } from "@storybook/react";

import Pagination from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Design System/Sections/Pagination",
  component: Pagination,
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
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalPages: 10,
  },
};
