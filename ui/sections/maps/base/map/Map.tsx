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
  position = [20.6597, 256.6500],
  zoom = 12,
  children,
}: MapProps) {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      maxZoom={18}
      scrollWheelZoom={true}
      className={styles.map}
    >
      {children}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FullscreenControl />
    </MapContainer>
  );
}

export default Map;
