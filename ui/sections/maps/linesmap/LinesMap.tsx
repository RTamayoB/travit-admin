import { Line } from "@/app/lib/definitions";
import { Icon } from "leaflet";
import React from "react";
import MapComponent, { Layer, Source } from "react-map-gl/mapbox";
import 'mapbox-gl/dist/mapbox-gl.css';

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
    <MapComponent
      initialViewState={{
        longitude: -103.29696486553104,
        latitude: 20.682718735053065,
        zoom: 14,
      }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      style={{height: "60vh", width: "100%"}}
      mapStyle={"mapbox://styles/mapbox/streets-v12"}
    >
      <>
        {lines.map((line) => (
          <Source id={line.id.toString()} type="geojson" data={line.route} key={line.id.toString()}>
            {console.log("Route for " + line.id, line.route)}
            <Layer
              id={line.id.toString()}
              type="line"
              layout={{ "line-join": "round", "line-cap": "round" }}
              paint={{ "line-color": "#d04116", "line-width": 4 }}
            />
          </Source>
        ))}
      </>
    </MapComponent>
  );
}

export default LinesMap;
