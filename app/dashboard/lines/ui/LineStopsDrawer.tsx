import StopMarker from "@/app/dashboard/lines/ui/StopMarker";
import {NewStop, Route, Step, Stop} from "@/app/lib/definitions";

export default function LineStopsDrawer({
        initialStops,
}: {
        initialStops: Stop[],
}) {
    
    const stops: NewStop[] = [
        {
            id: 1,
            location: {lat: 40.7128, lng: -74.0060 }
        },
        {
            id: 2,
            location: {lat: 40.7138, lng: -74.0050 }
        },
        {
            id: 3,
            location: {lat: 40.7148, lng: -74.0060 }
        }
    ]

     const steps: Step[] = [
         {
             id: 0,
             sequence_number: 1,
             polyline: {points: [{ lat: 0.1, lng: 0.2}, {lat: 0.2, lng: 0.3}] },
             startStop: stops[0],
             endStop: stops[1]
         },
         {
             id: 0,
             sequence_number: 1,
             polyline: {points: [{ lat: 0.4, lng: 0.5}, {lat: 0.6, lng: 0.7}] },
             startStop: stops[1],
             endStop: stops[2]
         }
     ]

    const route: Route = {
        id: 1,
        name: 'Route 1',
        steps: steps
    }

    return (
        <>
            {initialStops.map((stop) => (
                    <StopMarker
                        key={stop.id}
                        index={stop.id}
                        initialPosition={stop.location.coordinates}
                    />
                ))
            };
        </>
        )
}