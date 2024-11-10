import type { Meta, StoryObj } from "@storybook/react";

import Dropdown, { DropdownOption } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Design System/Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/design/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?node-id=159-7410&t=4Z9ISfcB0Vr7Tzss-1'",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const options: DropdownOption<number>[] = [
  {
    key: 1,
    value: "Option 1",
  },
  {
    key: 2,
    value: "Option 2",
  },
  {
    key: 3,
    value: "Option 3",
  },
  {
    key: 4,
    value: "Option 4",
  },
  {
    key: 5,
    value: "Option 5",
  },
  {
    key: 6,
    value: "Option 6",
  },
];

export const Default: Story = {
  args: {
    options: options,
    defaultOption: options[0],
    label: "Label",
  },
};
