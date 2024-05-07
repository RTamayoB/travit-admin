'use client';
import { Icon } from "leaflet";
import { useMemo, useRef, useState } from "react"
import { Marker } from "react-leaflet"

export default function DraggableMarker(props: any) {
    
    const { index, initialPosition, updateLinePosition } = props
    
    const dotIcon = new Icon({
        iconUrl: '/images/circle-dot.svg',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });
    
    const [position, setPosition] = useState(initialPosition)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    // @ts-ignore
                    setPosition(marker.getLatLng())
                    // @ts-ignore
                    updateLinePosition(index, marker.getLatLng());
                }
            },
        }),
        [],
        )

    return (
        <Marker
            key={index}
            draggable={true}
            eventHandlers={eventHandlers}
            icon={dotIcon}
            position={position}
            ref={markerRef}>
        </Marker>
        )
}