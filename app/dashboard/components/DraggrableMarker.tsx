import {Icon, LatLng} from "leaflet";
import {useEffect, useMemo, useRef, useState } from "react";
import {Marker} from "react-leaflet";
import {Marker as LeafletMarker} from "leaflet";

export default function DraggableMarker(
    {
        initialPosition,
        onDragEnd,
        icon,
        opacity
    }: {
        initialPosition: LatLng,
        onDragEnd: (latlng: LatLng) => void,
        icon: Icon,
        opacity?: number | 1
}
) {

    const [position, setPosition] = useState(initialPosition);
    const markerRef = useRef<LeafletMarker | null>(null);
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
                icon={icon}
                opacity={opacity}
                position={position}
                ref={markerRef}
            />
        </>
    );
}
