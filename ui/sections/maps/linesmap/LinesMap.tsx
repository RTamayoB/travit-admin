import { Line } from "@/app/lib/definitions";
import { Icon } from "leaflet";
import React from "react";
import MarkerWithPopup from "../base/markers/markerwithpopup";
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
    <Map
      children={
        <>
          {lines.map((line) => (
            <>
              {line.route_points.map((point) => (
                <React.Fragment key={point.order}>
                  <MarkerWithPopup
                    key={point.order}
                    initialPosition={point.position}
                    icon={point.isStop ? stopIcon : routeIcon}
                  />
                </React.Fragment>
              ))}
              <Polyline
                positions={line.route_points.map((point) => point.position)}
              />
            </>
          ))}
        </>
      }
    />
  );
}

export default LinesMap;
