"use client";

import "leaflet/dist/leaflet.css";
import "react-leaflet-fullscreen/styles.css";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import styles from "./map.module.scss";
import { FullscreenControl } from "react-leaflet-fullscreen";

interface MapProps {
  position?: LatLngExpression;
  zoom?: number | undefined;
  children: React.ReactNode;
}

function Map({
  position = [20.660674350654517, -103.34870919973106],
  zoom = 12,
  children,
}: MapProps) {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      maxZoom={18}
      minZoom={3}
      scrollWheelZoom={true}
      worldCopyJump={false}
      maxBoundsViscosity={1.0}
      className={styles.map}
      maxBounds={[
        [-90, -180],
      [90, 180]
      ]}
    >
      {children}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
      />
      <FullscreenControl />
    </MapContainer>
  );
}

export default Map;
