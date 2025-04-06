import type { Meta, StoryObj } from "@storybook/react";

import Table from "./Table";
import { Line } from "@/app/lib/definitions";

const meta: Meta<typeof Table> = {
  title: "Design System/Sections/Table",
  component: Table,
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
type Story = StoryObj<typeof Table>;

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
    route: { type: "FeatureCollection", features: [] }
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
    route: { type: "FeatureCollection", features: [] }
  },
];

export const Default: Story = {
  args: {
    data: lines,
    keysToIgnore: ["agency_id", "route_points"],
  },
};
