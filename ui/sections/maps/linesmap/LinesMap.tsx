import { Line } from "@/app/lib/definitions";
import { Icon } from "leaflet";
import React from "react";
import { Polyline } from "react-leaflet";
import Map from "../base/map";

interface LinesMapProps {
  lines: Line[];
}

function LinesMap({
  lines,
}: LinesMapProps) {
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

  return (
    <Map>
      <>
        {lines.map((line) => (
          <Polyline
            key={line.id}
            positions={line.route_points.map((point) => point.position)}
            color="#d04116"
          />
        ))}
      </>
    </Map>
  );
}

export default LinesMap;
