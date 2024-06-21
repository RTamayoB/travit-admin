import { useState } from "react";
import { Polyline, useMapEvents } from "react-leaflet";
import {LatLng} from "leaflet";
import DraggableMarker from "@/app/dashboard/components/DraggrableMarker";

export default function LineDrawer() {
    
    const lineOptions = { color: 'orange' }
    
    const [polyline, setPolyline] = useState<LatLng[]>([])
    const [startPoint, setStartPoint] = useState<LatLng | null>(null);
    const [endPoint, setEndPoint] = useState<LatLng | null>(null);
    const [currentMarker, setCurrentMarker] = useState<LatLng>(new LatLng(0,0))
    const map = useMapEvents({
        contextmenu(e) {
            console.log("CALLED CREATE LINE")
            const newPoint = e.latlng;
            const updatePolyline = [...polyline, newPoint];
            setPolyline(updatePolyline);
            console.log("LINE: " +  polyline)
        },
    })
    
    const startDragging = (index: number, position: LatLng) => {
        console.log("POINT: " + position)
        console.log("INDEX: " + index)
        const prevPoint = polyline[index - 1];
        const nextPoint = polyline[index + 1];
        setCurrentMarker(position)
        setStartPoint(prevPoint);
        setEndPoint(nextPoint);
    }

    const updateLinePosition = (index: number, newPosition: LatLng) => {
        console.log("CALLED UPDATE LINE")
        setPolyline( prevState => {
            const updatedPolyline = [...prevState]
            updatedPolyline[index] = newPosition
            return updatedPolyline
        });
        setStartPoint(null);
        setEndPoint(null);
    }
    
    return (
        <>
        {polyline.map((point, index) => (
            <DraggableMarker
                key={index}
                index={index}
                initialPosition={point}
                onMarkerDrag={updateLinePosition}
            />
            ))
        };
        <Polyline pathOptions={lineOptions} positions={polyline}  />
        {/*Dotted Lines*/}
        {startPoint && <Polyline pathOptions={{ dashArray: '4, 4' }} positions={[startPoint, currentMarker]} />}
        {endPoint && <Polyline pathOptions={{ dashArray: '4, 4' }} positions={[endPoint, currentMarker]} />}
        </>
        )
    }