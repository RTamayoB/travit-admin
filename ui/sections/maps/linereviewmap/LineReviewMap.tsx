import { Line } from "@/app/lib/definitions";
import React from "react";
import { Polyline } from "react-leaflet";
import Map from "../base/map";

interface LineReviewMapProps {
  line: Line;
}

function LineReviewMap({
  line,
}: LineReviewMapProps) {

  return (
    <Map>
      <Polyline
        positions={line.route_points.map((point) => point.position)}
        color="#d04116"
      />
    </Map>
  );
}

export default LineReviewMap;
