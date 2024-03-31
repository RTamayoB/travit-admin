'use client';
import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import styles from "./map.module.scss"
import {Icon} from "leaflet";

export default function Map(props: any) {
    const { position, zoom } = props
    
    const customIcon = new Icon({
        iconUrl: require("../../../public/images/map-pin.svg"),
        iconSize: [38, 38]
    });
    
    return (
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} className={styles.map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}