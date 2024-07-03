'use client';

import StopMarker from "@/app/dashboard/lines/ui/StopMarker";
import MapEvents from "@/app/dashboard/lines/test-page/MapEvents";
import {useState } from "react";
import {Marker, Polyline } from "react-leaflet";
import DraggableMarker from "@/app/dashboard/components/DraggrableMarker";
import {Icon, LatLng} from "leaflet";
import React from "react";
import { BusStop, Position, RoutePoint } from "./lib/new-definitions";
import MarkerClusterGroup from "react-leaflet-cluster";

const routeIcon = new Icon({
  iconUrl: '/images/circle-dot.svg',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});


const stopIcon = new Icon({
  iconUrl: '/images/stop-circle-dot.svg',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

export default function MapComponent({
        stops,
        initialRoutePoints
}: {
        stops: BusStop[],
        initialRoutePoints: RoutePoint[]
}) {
  
  const [maxId, setMaxId] = useState(Math.max(0, ...initialRoutePoints.map(point => point.id)));
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>(initialRoutePoints);
  
  const handleRightClick = (latlng: LatLng) => {
    const newId = maxId + 1;
    const newPoint: RoutePoint = {
      id: newId,
      position: latlng,
      isStop: false,
      order: newId,
    };
    setRoutePoints([...routePoints, newPoint]);
    setMaxId(newId); 
  };

  const handleDeleteLastPoint = () => {
    if (routePoints.length > 0) {
      setRoutePoints(routePoints.slice(0, -1));
      setMaxId(maxId - 1);
    }
  };
  
  const handleDragEnd = (index: number, latlng: LatLng) => {
    const snappedBusStop = stops.find(stop => latlng.distanceTo(stop.position) < 10); // Adjust the distance threshold as needed
    const newPoints = [...routePoints];
    if (snappedBusStop) {
      newPoints[index].position = snappedBusStop.position;
      newPoints[index].isStop = true;
      newPoints[index].busStop = snappedBusStop;
    } else {
      newPoints[index].position = latlng;
      newPoints[index].isStop = false;
      newPoints[index].busStop = undefined;
    }
    setRoutePoints(newPoints);
  };
  
  const getMidpoint = (latlng1: Position, latlng2: Position): LatLng => {
    const newLat = (latlng1.lat + latlng2.lat) / 2;
    const newLng = (latlng1.lng + latlng2.lng) / 2;
    return new LatLng(newLat, newLng);
  };
  
  const handleAddIntermediatePoint = (index: number, latlng: LatLng) => {
    const newId = maxId + 1;
    const newPoints = [
      ...routePoints.slice(0, index + 1),
      {
        id: newId,
        position: latlng,
        isStop: false,
        order: newId, // Adjust order for new point
      },
      ...routePoints.slice(index + 1),
    ];

    // Update order for subsequent points
    const updatedPoints = newPoints.map((point, idx) => ({
      ...point,
      order: idx + 1,
    }));

    setMaxId(newId);
    setRoutePoints(updatedPoints);
  };

  return (
    <>
      <MarkerClusterGroup
        chunkedLoading
      >
        {stops.map((stop) => (
          <StopMarker key={stop.id} index={stop.id} initialPosition={stop.position} name={stop.name}/>
        ))}
      </MarkerClusterGroup>
      {routePoints.map((point, index) => (
        <React.Fragment key={point.id}>
          <DraggableMarker
            key={point.id}
            initialPosition={point.position as LatLng}
            onDragEnd={(latlng) => handleDragEnd(index, latlng)}
            icon={point.isStop ? stopIcon : routeIcon}
          />
          {index < routePoints.length - 1 && (
            <DraggableMarker
              initialPosition={getMidpoint(point.position, routePoints[index + 1].position)}
              onDragEnd={(latlng) => handleAddIntermediatePoint(index, latlng)}
              icon={routeIcon}
              opacity={0.5}
            />
          )}
        </React.Fragment>
      ))}
      <Polyline positions={routePoints.map((point) => point.position)} />
      <MapEvents
        onRightClick={handleRightClick}
        onDeleteLastPoint={handleDeleteLastPoint}
      />
      <p>LMAO</p>
    </>
  )
}