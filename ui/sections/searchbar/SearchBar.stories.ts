import type { Meta, StoryObj } from "@storybook/react";

import SearchBar from "./SearchBar";

const meta: Meta<typeof SearchBar> = {
  title: "Design System/Sections/SearchBar",
  component: SearchBar,
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
type Story = StoryObj<typeof SearchBar>;

export const MainHeader: Story = {
  args: {
    searchPlaceholder: "Buscar Lineas...",
  },
  parameters: {
    appDirectory: true,
    nextjs: {
      router: {
        basePath: "/dashboard/lines",
      },
      navigation: {
        pathname: "/dashboard/lines",
      },
    },
  },
};
