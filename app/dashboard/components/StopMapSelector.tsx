'use client';

import DraggableMarker from "@/app/dashboard/components/DraggrableMarker";
import {useMapEvents} from "react-leaflet";
import {LatLng} from "leaflet";

export default function StopMapSelector({
        marker,
        onSetMarker
    }: {
        marker: LatLng | null,
        onSetMarker: (LatLng: any) => void,
}) {
    

    const map = useMapEvents({
        contextmenu(e) {
            onSetMarker(e.latlng)
        },
    });
    
    const updateMarkerPosition = (index: number, newPosition: LatLng) => {
        onSetMarker(newPosition)
    };

    return (
        <>
            {marker != null && (
                <DraggableMarker
                    index={0}
                    initialPosition={marker}
                    onMarkerDrag={updateMarkerPosition}
                    />
            )}
        </>
        )
    }