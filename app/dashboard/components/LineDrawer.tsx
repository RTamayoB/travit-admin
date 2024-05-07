import { useState } from "react";
import { Polyline, useMapEvents } from "react-leaflet";
import DraggableMarker from "./DraggrableMarker";
import {LatLng} from "leaflet";

export default function LineDrawer() {
    
    const lineOptions = { color: 'orange' }
    
    const [polyline, setPolyline] = useState<LatLng[]>([])
    const map = useMapEvents({
        contextmenu(e) {
            console.log("CALLED CREATE LINE")
            const newPoint = e.latlng;
            const updatePolyline = [...polyline, newPoint];
            setPolyline(updatePolyline);
        },
    })
    
    const updateLinePosition = (index: number, newPosition: LatLng) => {
        console.log("CALLED UPDATE LINE")
        setPolyline( prevState => {
            const updatedPolyline = [...prevState]
            updatedPolyline[index] = newPosition
            return updatedPolyline
        });
    }
    
    return (
        <>
        {polyline.map((point, index) => (
            <DraggableMarker
                key={index}
                index={index}
                initialPosition={point}
                updateLinePosition={updateLinePosition}
            />
            ))
        };
        <Polyline pathOptions={lineOptions} positions={polyline} />
        </>
        )
    }