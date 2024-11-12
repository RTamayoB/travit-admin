import MarkerClusterGroup from "react-leaflet-cluster";
import Map from "../base/map";
import { Stop } from "@/app/lib/definitions";
import { useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import MarkerWithPopup from "../base/markers/markerwithpopup";
import { Icon } from "leaflet";

const dotIcon = new Icon({
  iconUrl: "/images/bus-stop.svg",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface StopsMapProps {
  initialStops: Stop[];
  selectedStop: Stop | null;
}

function StopsMap({
  initialStops,
  selectedStop,
}: StopsMapProps) {
  return (
    <Map>
      <MarkerClusterGroup chunkedLoading>
        {initialStops.map((stop) => (
          <MarkerWithPopup
            key={stop.id}
            initialPosition={stop.position}
            label={stop.name}
            icon={dotIcon}
          />
        ))};
      </MarkerClusterGroup>
      <MapEvents
        selectedStop={selectedStop}
      />
    </Map>
  );
}

function MapEvents({
  selectedStop,
}: {
  selectedStop: Stop | null;
}) {
  const map = useMapEvents({});

  useEffect(() => {
    if (selectedStop) {
      map.setView(selectedStop.position, 15, {
        animate: true,
        duration: 0.5,
      });
    }
  }, [selectedStop, map]);

  return null;
}

export default StopsMap;
