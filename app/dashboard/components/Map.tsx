'use client';
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, Polyline, useMapEvents, Marker} from "react-leaflet";
import styles from "./map.module.scss"
import LineDrawer from "@/app/dashboard/components/LineDrawer";

export default function Map(props: any) {
    const { position, zoom } = props

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            scrollWheelZoom={false}
            className={styles.map}
            >
            <LineDrawer />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}
