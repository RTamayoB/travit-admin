import type { Meta, StoryObj } from "@storybook/react";

import Breadcrumbs from "./Breadcrumbs";
import { Breadcrumb } from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Design System/Components/Breadcrumbs",
  component: Breadcrumbs,
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
type Story = StoryObj<typeof Breadcrumbs>;

const breadcrumbs: Breadcrumb[] = [
  {
    label: "Inicio",
    href: "www.example.com/home",
  },
  {
    label: "Sub-pagina",
    href: "www.example.com/home/sub-page",
    active: true,
  },
];

export const Default: Story = {
  args: {
    breadcrumbs: breadcrumbs,
  },
};
