import type { Meta, StoryObj } from "@storybook/react";

import LineLayout from "./LineLayout";
import { Line } from "@/app/lib/definitions";

const meta: Meta<typeof LineLayout> = {
  title: "Design System/Dashboard/Lines/Layout",
  component: LineLayout,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/design/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?node-id=32-62420&t=4Z9ISfcB0Vr7Tzss-1",
    },
  },
};

const lines: Line[] = [
  {
    id: 1,
    line_number: "C01",
    legacy_line_number: "T-001",
    units: 25,
    agency_id: 1,
    transport_type: "bus",
    line_type: "troncal",
    route_points: [],
  },
  {
    id: 2,
    line_number: "C02",
    legacy_line_number: "T-002",
    units: 30,
    agency_id: 2,
    transport_type: "bus",
    line_type: "troncal",
    route_points: [],
  },
];

export default meta;
type Story = StoryObj<typeof LineLayout>;

export const Layout: Story = {
  args: {
    lines: lines,
    totalPages: 1
  },
};
