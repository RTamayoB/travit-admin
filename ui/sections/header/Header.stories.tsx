import type { Meta, StoryObj } from "@storybook/react";

import Header from "./Header";
import { LinkButton } from "../../components";

const meta: Meta<typeof Header> = {
  title: "Design System/Sections/Header",
  component: Header,
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
type Story = StoryObj<typeof Header>;

export const MainHeader: Story = {
  args: {
    breadcrumbList: [{label: 'Pagina', href: '/page', active: true}]
  },
};

export const SubHeader: Story = {
  args: {
    breadcrumbList: [{label: 'Pagina', href: '/page'}, {label: 'SubPagina', href: '/page/sub-page', active: true}]
  },
};

export const WithActions: Story = {
  args: {
    breadcrumbList: [{label: 'Pagina', href: '/page'}, {label: 'SubPagina', href: '/page/sub-page', active: true}],
    actions: (
      <LinkButton href={'/page/action'} label="Action Button"/>
    )
  },
};
