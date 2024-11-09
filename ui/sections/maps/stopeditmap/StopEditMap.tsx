import { Icon, LatLng } from "leaflet";
import Map from "../base/map";
import DraggableMarker from "../base/markers/dragglablemarker";
import { useMapEvents } from "react-leaflet";

const dotIcon = new Icon({
  iconUrl: '/images/bus-stop.svg',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

interface StopEditMapProps {
  marker: LatLng | null;
  onSetMarker: (LatLng: any) => void;
}

function StopEditMap({
  marker,
  onSetMarker
}: StopEditMapProps) {

  const updateMarkerPosition = (newPosition: LatLng) => {
    onSetMarker(newPosition)
  };

  return (
    <Map>
      {marker != null && (
        <DraggableMarker
          key={0}
          initialPosition={marker}
          onDragEnd={updateMarkerPosition}
          icon={dotIcon}
        />
      )}
      <MapEvents
        handleMarkerPosition={updateMarkerPosition}
      />
    </Map>
  );
}

function MapEvents({
  handleMarkerPosition
}: {
  handleMarkerPosition: (newPosition: LatLng) => void
}) {

  const map = useMapEvents({
    contextmenu(e) {
      handleMarkerPosition(e.latlng)
    },
  });

  return null;
}

export default StopEditMap;