'use client';

import {useMapEvents} from "react-leaflet";
import {Stop} from "@/app/lib/definitions";
import {useEffect} from "react";
import StopMarker from "@/app/dashboard/lines/ui/StopMarker";

const dotIcon = new Icon({
    iconUrl: '/images/bus-stop.svg',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
});

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
            map.setView(selectedStop.position, 15, {
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
                        initialPosition={stop.position}
                        name={stop.name}
                        icon={dotIcon}
                    />
                ))
            };
        </>
        )
    }