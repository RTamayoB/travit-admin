"use client";

import { Button, Typography } from "@/ui/components";
import { Icon, LatLngExpression } from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { Marker as LeafletMarker, PointExpression } from "leaflet";
import { Stop } from "@/app/lib/definitions";

interface StopMarkerProps {
  stop: Stop;
  index?: number;
  initialPosition: LatLngExpression;
  label?: string;
  draggable: boolean;
  onEditStop: (stop: Stop) => void;
  onMarkerMoved: (stop: Stop) => void;
  onDeleteStop: (stop: Stop) => void;
}

function StopMarker({
  stop,
  index,
  initialPosition,
  label,
  draggable,
  onEditStop,
  onMarkerMoved,
  onDeleteStop,
}: StopMarkerProps) {
  const stopIcon = new Icon({
    iconUrl: "/images/bus-stop.svg",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const movableIcon = new Icon({
    iconUrl: "/images/map-pin.svg",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const markerRef = useRef<LeafletMarker | null>(null);
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
          let newStop = { ...stop, position: marker.getLatLng() };
          onMarkerMoved(newStop);
        }
      },
    }),
    [onMarkerMoved],
  );

  return (
    <>
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        key={index}
        ref={markerRef}
        icon={draggable ? stopIcon : movableIcon}
        position={position}
        autoPan={true}
      >
        {label && (
          <Popup>
            <StopPopup
              stop={stop}
              onEditStop={onEditStop}
              onDeleteStop={onDeleteStop}
            />
          </Popup>
        )}
      </Marker>
    </>
  );
}

function StopPopup({
  stop,
  onEditStop,
  onDeleteStop,
}: {
  stop: Stop;
  onEditStop: (stop: Stop) => void;
  onDeleteStop: (stop: Stop) => void;
}) {
  return (
    <div>
      <Typography variant="note">{stop.name}</Typography>
      <Typography variant="note">{stop.description}</Typography>
      <div>
        <Button
          trailIconUrl="/icons/edit.svg"
          label="Editar"
          size="small"
          onClick={() => onEditStop(stop)}
        />
        <Button
          trailIconUrl="/icons/delete.svg"
          label="Eliminar"
          size="small"
          primary={false}
          onClick={() => onDeleteStop(stop)}
        />
      </div>
    </div>
  );
}

export default StopMarker;
