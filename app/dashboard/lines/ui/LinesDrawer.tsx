import React from "react";
import { Polyline } from "react-leaflet";
import StopMarker from "@/app/dashboard/lines/ui/StopMarker";
import { Icon, LatLng } from "leaflet";
import { Line } from "@/app/lib/definitions";

const routeIcon = new Icon({
  iconUrl: "/images/circle-dot.svg",
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const stopIcon = new Icon({
  iconUrl: "/images/stop-circle-dot.svg",
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

export default function LinesDrawer({ lines }: { lines: Line[] }) {
  return (
    <>
      {lines.map((line) => (
        <>
          {line.route_points.map((point) => (
            <React.Fragment key={point.order}>
              <StopMarker
                key={point.order}
                initialPosition={point.position as LatLng}
                icon={point.isStop ? stopIcon : routeIcon}
              />
            </React.Fragment>
          ))}
          <Polyline positions={line.route_points.map((point) => point.position)} />
        </>
      ))}
      ;
    </>
  );
}
