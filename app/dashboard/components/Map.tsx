'use client';
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer } from "react-leaflet";
import styles from "./map.module.scss"

export default function Map(props: any) {
    const { position, zoom, children } = props

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            maxZoom={20}
            scrollWheelZoom={true}
            className={styles.map}
            >
            {children}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}
