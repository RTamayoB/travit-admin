import { Icon } from "leaflet";
import React from "react";
import MapComponent, { Layer, Source } from "react-map-gl/mapbox";
import 'mapbox-gl/dist/mapbox-gl.css';
import { Route, Trip } from "@/app/lib/definitions";


interface RoutesMapProps {
  routes: Route[];
}

function RoutesMap({
  routes,
}: RoutesMapProps) {
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
        {routes.map((route) => {
          const features = (route.trips ?? [])
            .filter((t) => t?.polyline && t.polyline.type === "LineString" && Array.isArray(t.polyline.coordinates))
            .map((t) => ({
              type: "Feature" as const,
              geometry: t.polyline,
              properties: { routeId: route.id, tripId: t.id },
            }));

          if (features.length === 0) return null;

          const collection = {
            type: "FeatureCollection" as const,
            features,
          };

          return (
            <Source id={`route-src-${route.id}`} type="geojson" data={collection} key={route.id}>
              <Layer
                id={`route-lyr-${route.id}`}
                type="line"
                layout={{ "line-join": "round", "line-cap": "round" }}
                paint={{ "line-color": "#d04116", "line-width": 4 }}
              />
            </Source>
          );
        })}
      </>
    </MapComponent>
  );
}

export default RoutesMap;
