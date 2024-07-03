import Map from "@/app/dashboard/components/Map";
import MapComponent from "./MapComponent";
import { BusStop, RoutePoint } from "./lib/new-definitions";
import ShowInfoButton from "@/app/dashboard/lines/test-page/ShowInfoButton";

export default async function Page() {
  
  //const stops = await fetchAllStops()
  const stops: BusStop[] = [
    {
      id: 1,
      name: "Stop 1",
      position: {lat: 20.660358444559478, lng: 256.64978340742806},
    },
    {
      id: 2,
      name: "Stop 2",
      position: {lat: 20.659153778132367, lng: 256.6487634959777},
    },
    {
      id: 3,
      name: "Stop 3",
      position: {lat: 20.658154901644128, lng: 256.64710617547115},
    },
    {
      id: 4,
      name: "Stop 4",
      position: {lat: 20.659214011680547, lng: 256.64428270252415},
    },
  ]
  
  const routePoints: RoutePoint[] = [
    {
      id: 1,
      position: {lat: 20.680358444559478, lng: 256.66978340742806},
      isStop: false,
      order: 1,
      busStop: null,
    },
    {
      id: 2,
      position: {lat: 21.700358444559478, lng: 256.69978340742806},
      isStop: false,
      order: 2,
      busStop: null,
    }
  ]

  return (
    <>
      <div>
        <ShowInfoButton />
        <Map position={[20.6597, 256.6500]} zoom={17}>
          <MapComponent stops={stops} initialRoutePoints={routePoints}/>
        </Map>
      </div>
    </>
  )
}