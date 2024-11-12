"use client";

import MarkerClusterGroup from "react-leaflet-cluster";
import DraggableMarker from "../base/markers/dragglablemarker";
import React, { useCallback, useEffect, useState } from "react";
import MarkerWithPopup from "../base/markers/markerwithpopup";
import { Position, RoutePoint, Stop } from "@/app/lib/definitions";
import { Polyline, useMap } from "react-leaflet";
import { Icon, LatLng, LeafletMouseEvent } from "leaflet";
import Map from "../base/map";

const routeIcon = new Icon({
  iconUrl: "/images/circle-dot.svg",
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const stopIcon = new Icon({
  iconUrl: "/images/stop-circle-dot.svg",
  iconSize: [20, 20],
  iconAnchor: [9, 9],
});

const dotIcon = new Icon({
  iconUrl: "/images/bus-stop.svg",
  iconSize: [15, 15],
  iconAnchor: [6, 6],
});

interface LineEditMapProps {
  stops: Stop[];
  routePoints: RoutePoint[];
  onRoutePointsUpdate: (routePoints: RoutePoint[]) => void;
}

function LineEditMap({
  stops,
  routePoints,
  onRoutePointsUpdate,
}: LineEditMapProps) {
  const [maxId, setMaxId] = useState(
    Math.max(0, ...routePoints.map((point) => point.order)),
  );

  // Asures the map is focus before doing certain functions
  const isInputFocused = useCallback(() => {
    const activeElement = document.activeElement;
    return activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA");
  }, []);

  // Creates a new point on the line
  const handleRightClick = useCallback((latlng: LatLng) => {
    const newId = maxId + 1;
    const newPoint: RoutePoint = {
      position: latlng,
      isStop: false,
      order: newId,
      busStop: null,
    };
    onRoutePointsUpdate([...routePoints, newPoint]);
    setMaxId(newId);
  }, [maxId, onRoutePointsUpdate, routePoints]);

  // Deletes the last point on the line
  const handleDeleteLastPoint = useCallback(() => {
    if (routePoints.length > 0 && !isInputFocused()) {
      onRoutePointsUpdate(routePoints.slice(0, -1));
      setMaxId(maxId - 1);
    }
  }, [isInputFocused, onRoutePointsUpdate, routePoints]);

  //Handles when a point is a dragged, and snaps it to a bus stop if near one
  const handleDragEnd = useCallback((index: number, latlng: LatLng) => {
    const snappedBusStop = stops.find((stop) =>
      latlng.distanceTo(stop.position) < 10
    ); // Adjust the distance threshold as needed
    const newPoints = [...routePoints];
    newPoints[index] = {
      ...newPoints[index],
      position: snappedBusStop ? snappedBusStop.position : latlng,
      isStop: !!snappedBusStop,
      busStop: snappedBusStop || null,
    };
    onRoutePointsUpdate(newPoints);
  }, [onRoutePointsUpdate, routePoints, stops]);

  //Handle the logic if a phantom point is dragged.
  const handleAddIntermediatePoint = useCallback(
    (index: number, latlng: LatLng) => {
      const newId = maxId + 1;
      const newPoints = [
        ...routePoints.slice(0, index + 1),
        {
          id: null,
          position: latlng,
          isStop: false,
          order: newId, // Adjust order for new point
          busStop: null,
        },
        ...routePoints.slice(index + 1),
      ];

      // Update order for subsequent points
      const updatedPoints = newPoints.map((point, idx) => ({
        ...point,
        order: idx + 1,
      }));

      setMaxId(newId);
      onRoutePointsUpdate(updatedPoints);
    },
    [maxId, onRoutePointsUpdate, routePoints],
  );

  // Get the midpoint between two points.
  const getMidpoint = (latlng1: Position, latlng2: Position): LatLng => {
    const newLat = (latlng1.lat + latlng2.lat) / 2;
    const newLng = (latlng1.lng + latlng2.lng) / 2;
    return new LatLng(newLat, newLng);
  };

  return (
    <Map>
      <MarkerClusterGroup
        chunkedLoading
      >
        {stops.map((stop) => (
          <MarkerWithPopup
            key={stop.id}
            initialPosition={stop.position}
            label={stop.name}
            icon={dotIcon}
          />
        ))}
      </MarkerClusterGroup>
      {routePoints.map((point, index) => (
        <React.Fragment key={point.order}>
          <DraggableMarker
            key={point.order}
            initialPosition={point.position as LatLng}
            onDragEnd={(latlng) => handleDragEnd(index, latlng)}
            icon={point.isStop ? stopIcon : routeIcon}
          />
          {index < routePoints.length - 1 && (
            <DraggableMarker
              initialPosition={getMidpoint(
                point.position,
                routePoints[index + 1].position,
              )}
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
    </Map>
  );
}

function MapEvents({
  onRightClick,
  onDeleteLastPoint,
}: {
  onRightClick: (latlng: LatLng) => void;
  onDeleteLastPoint: () => void;
}) {
  const map = useMap();

  useEffect(() => {
    const handleRightClick = (event: LeafletMouseEvent) => {
      onRightClick(event.latlng);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "D" && event.shiftKey) {
        onDeleteLastPoint();
      }
    };

    map.on("contextmenu", handleRightClick);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      map.off("contextmenu", handleRightClick);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [map, onRightClick, onDeleteLastPoint]);

  return null;
}

export default LineEditMap;
