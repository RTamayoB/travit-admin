import type { Meta, StoryObj } from "@storybook/react";

import Map from "./Map";
import MarkerWithPopup from "../markers/markerwithpopup";
import { Icon, LatLng } from "leaflet";
import DraggableMarker from "../markers/dragglablemarker";

const dotIcon = new Icon({
  iconUrl: "/images/circle-dot.svg",
  iconSize: [30, 30],
  iconAnchor: [12, 12],
});

const meta: Meta<typeof Map> = {
  title: "Design System/Sections/Maps/Base/Map",
  component: Map,
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
type Story = StoryObj<typeof Map>;

export const Default: Story = {
  args: {
    zoom: 12,
  },
};

export const MapWithMarkerWithPopup: Story = {
  args: {
    zoom: 12,
    children: (
      <MarkerWithPopup
        initialPosition={[20.6597, 256.65]}
        label="Marker With Popup"
        icon={dotIcon}
      />
    ),
  },
};

export const MapWithDraggableMarker: Story = {
  args: {
    zoom: 12,
    children: (
      <DraggableMarker
        initialPosition={new LatLng(20.6597, 256.65)}
        onDragEnd={() => undefined}
        icon={dotIcon}
      />
    ),
  },
};
