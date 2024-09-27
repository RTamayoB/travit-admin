'use client';

import { LatLng } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function MapEvents({
        onRightClick,
        onDeleteLastPoint
}: {
        onRightClick: (latlng: LatLng) => void;
        onDeleteLastPoint: () => void;
}) {
  
    const map = useMap();

    useEffect(() => {
      const handleRightClick = (event: any) => {
        onRightClick(event.latlng);
      };
  
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'D' && event.shiftKey) {
          onDeleteLastPoint();
        }
      };
  
      map.on('contextmenu', handleRightClick);
      document.addEventListener('keydown', handleKeyPress);
  
      return () => {
        map.off('contextmenu', handleRightClick);
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, [map, onRightClick, onDeleteLastPoint]);

  return null;
}
