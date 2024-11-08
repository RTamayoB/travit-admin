'use client';

import DraggableMarker from "@/ui/sections/maps/base/markers/dragglablemarker/DraggableMarker";
import {useMapEvents} from "react-leaflet";
import {Icon, LatLng} from "leaflet";

export default function StopMapSelector({
        marker,
        onSetMarker
    }: {
        marker: LatLng | null,
        onSetMarker: (LatLng: any) => void,
}) {
    

    const dotIcon = new Icon({
        iconUrl: '/images/bus-stop.svg',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });

    const map = useMapEvents({
        contextmenu(e) {
            onSetMarker(e.latlng)
        },
    });
    
    const updateMarkerPosition = (newPosition: LatLng) => {
        onSetMarker(newPosition)
    };

    return (
        <>
            {marker != null && (
                <DraggableMarker
                    key={0}
                    initialPosition={marker}
                    onDragEnd={updateMarkerPosition}
                    icon={dotIcon}
                    />
            )}
        </>
        )
    }
