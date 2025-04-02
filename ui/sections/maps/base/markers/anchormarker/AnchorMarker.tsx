'use client';

import { Position } from "geojson"
import { ReactNode, useState } from "react";
import { Marker, MarkerDragEvent, MarkerEvent } from "react-map-gl/mapbox"

interface AnchorMarkerProps {
  position: Position;
  icon?: ReactNode
  onClick?: (e: MarkerEvent<MouseEvent>) => void;
  onDbClick?: (e: MarkerEvent<MouseEvent>) => void;
  onDrag?: (e: MarkerDragEvent) => void;
  onDragEnd?: (e: MarkerDragEvent) => void;
}

function AnchorMarker({
  position,
  icon,
  onClick,
  onDbClick,
  onDrag,
  onDragEnd
} : AnchorMarkerProps) {

  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleAnchorClick = (e: MarkerEvent<MouseEvent>) => {
      e.originalEvent.stopPropagation(); // Prevent map from capturing the click event
    
      if (clickTimeout) {
        // Double click detected
        clearTimeout(clickTimeout);
        setClickTimeout(null);
        console.log("Double Click Detected on Marker:", stop);
        if (onDbClick) { onDbClick(e); }
      } else {
        // Set timeout for single click detection
        const timeout = setTimeout(() => {
          console.log("Single Click Detected on Marker:", stop);
          if (onClick) { onClick(e); }
          setClickTimeout(null);
        }, 300);
    
        setClickTimeout(timeout);
      }
    };

  return (
    <Marker
      longitude={position[0]} 
      latitude={position[1]} 
      draggable={true}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onClick={handleAnchorClick}
    >
      {icon}
    </Marker>
  )
}

export default AnchorMarker;
