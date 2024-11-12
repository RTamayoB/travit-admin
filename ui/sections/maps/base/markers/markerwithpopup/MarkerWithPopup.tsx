"use client";

import { Icon, LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";

interface MarkerWithPopupProps {
  key?: number;
  initialPosition: LatLngExpression;
  label?: string;
  icon: Icon;
}

function MarkerWithPopup({
  key,
  initialPosition,
  label,
  icon,
}: MarkerWithPopupProps) {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  return (
    <>
      <Marker
        key={key}
        icon={icon}
        position={position}
      >
        {label && (
          <Popup>
            {label}
          </Popup>
        )}
      </Marker>
    </>
  );
}

export default MarkerWithPopup;
