import Map from "@/app/dashboard/components/Map";
import MapComponent from "./MapComponent";
import { RoutePoint } from "./lib/new-definitions";
import ShowInfoButton from "@/app/dashboard/lines/test-page/ShowInfoButton";
import { getRouteById } from "./lib/new-actions";
import { fetchAllStops } from "../lib/get-all-stops-action";
import {Stop} from "@/app/lib/definitions";

export default async function Page() {
  

  const mockStops: Stop[] = [
    {
      id: 1,
      created_at: "",
      name: "Stop 1",
      description: "",
      position: {lat: 20.660358444559478, lng: 256.64978340742806},
    },
    {
      id: 2,
      created_at: "",
      name: "Stop 2",
      description: "",
      position: {lat: 20.659153778132367, lng: 256.6487634959777},
    },
    {
      id: 3,
      created_at: "",
      name: "Stop 3",
      description: "",
      position: {lat: 20.658154901644128, lng: 256.64710617547115},
    },
    {
      id: 4,
      created_at: "",
      name: "Stop 4",
      description: "",
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

  //const line = await getRouteById(1);
  const stops = await fetchAllStops()

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