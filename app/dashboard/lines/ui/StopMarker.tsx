import { Icon } from "leaflet";
import {useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";

export default function StopMarker(props: any) {
    const {
        index,
        initialPosition,
        name
    } = props;

    const dotIcon = new Icon({
        iconUrl: '/images/bus-stop.svg',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
    
    const [position, setPosition] = useState(initialPosition);

    useEffect(() => {
        setPosition(initialPosition);
    }, [initialPosition]);

    return (
        <>
            <Marker
                key={index}
                icon={dotIcon}
                position={position}
            >
                <Popup>
                    {name}
                </Popup>
            </Marker>
        </>
    );
}