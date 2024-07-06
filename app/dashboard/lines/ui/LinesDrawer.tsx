import { Route } from "../test-page/lib/new-definitions";
import React from "react";
import { Polyline } from "react-leaflet";
import StopMarker from "@/app/dashboard/lines/ui/StopMarker";
import {Icon, LatLng } from "leaflet";

const routeIcon = new Icon({
    iconUrl: '/images/circle-dot.svg',
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });

const stopIcon = new Icon({
    iconUrl: '/images/stop-circle-dot.svg',
    iconSize: [12, 12],
    iconAnchor: [6, 6]
});

export default function LinesDrawer({
        lines,
}: {
        lines: Route[],
}) {

    return (
        <>
            {lines.map((line) => (
                    <>
                        {line.points.map((point) => (
                            <React.Fragment key={point.order}>
                              <StopMarker
                                key={point.order}
                                initialPosition={point.position as LatLng}
                                icon={point.isStop ? stopIcon : routeIcon}
                              />
                            </React.Fragment>
                          ))}
                          <Polyline positions={line.points.map((point) => point.position)} />
                    </>
            ))};
        </>
    )
}