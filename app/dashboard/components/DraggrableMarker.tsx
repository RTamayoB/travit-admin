import {Icon, LatLng} from "leaflet";
import {useEffect, useMemo, useRef, useState } from "react";
import {Marker} from "react-leaflet";

const dotIcon = new Icon({
    iconUrl: '/images/circle-dot.svg',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

export default function DraggableMarker(
    {
        initialPosition,
        onDragEnd,
        opacity
    }: {
        initialPosition: LatLng,
        onDragEnd: (latlng: LatLng) => void,
        opacity?: number | 1
}
) {

    const [position, setPosition] = useState(initialPosition);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                    onDragEnd(marker.getLatLng());
                }
            },
        }),
        [onDragEnd]
    );

    useEffect(() => {
        setPosition(initialPosition);
    }, [initialPosition]);

    return (
        <>
            <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                icon={dotIcon}
                opacity={opacity}
                position={position}
                ref={markerRef}
            />
        </>
    );
}