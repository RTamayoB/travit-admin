'use client';

import {useMapEvents} from "react-leaflet";
import {Stop} from "@/app/lib/definitions";
import {useEffect} from "react";
import StopMarker from "@/app/dashboard/lines/ui/StopMarker";

export default function StopsController({
        initialStops,
        selectedStop,
}: {
        initialStops: Stop[],
        selectedStop: Stop | null,
}) {

    const map = useMapEvents({})
    
    useEffect(() => {
        if (selectedStop) {
            const { coordinates } = selectedStop.location;
            map.setView([coordinates[0], coordinates[1]], 15, {
                animate: true,
                duration: 0.5
            });
        }
    }, [selectedStop, map]);

    return (
        <>
            {initialStops.map((stop) => (
                    <StopMarker
                        key={stop.id}
                        index={stop.id}
                        initialPosition={stop.location.coordinates}
                        name={stop.name}
                    />
                ))
            };
        </>
        )
    }