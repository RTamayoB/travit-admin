'use client';

import {useState} from "react"
import DraggableMarker from "@/app/dashboard/components/DraggrableMarker";
import {useMapEvents} from "react-leaflet";

interface Stop {
    id: number;
    name: string;
    description: string;
    position: number[]
}

export default function StopsController() {

    const initialStop: Stop = {
        id: 0,
        name: "Stop",
        description: "Example Stop",
        position: [20.725612, 256.569693]
    }

    const [stops, setStops] = useState<Stop[]>([initialStop])
    
    const map = useMapEvents({
            contextmenu(e) {
                const newPoint = e.latlng;
                const newStop: Stop = {
                    id: 0,
                    name: "Stop",
                    description: "Example Stop",
                    position: [e.latlng.lat, e.latlng.lng]
                }
                const updatedStops = [...stops, newStop];
                setStops(updatedStops);
            },
        })
    
    const placeholder = (id: number) => {
        
    }
    
    return (
        <>
        {stops.map((stop) => (
            <DraggableMarker
                key={stop.id}
                index={stop.id}
                initialPosition={stop.position}
                onMarkerDrag={placeholder}
            />
        ))
        };
        </>
        )
    }