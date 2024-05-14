import Map from "../components/Map"
import StopsController from "@/app/dashboard/components/StopsController";
import {fetchStops} from "@/app/dashboard/stops/actions";

export default async function Page() {

    const stops = await fetchStops()

    return (
        <>
            <ul>
                {stops.map((stop) => (
                    <li key={stop.id}>
                        {stop.location.coordinates[0]}
                         - 
                        {stop.location.coordinates[1]}
                    </li>
                ))}
            </ul>
            <Map position={[20.6597, 256.6500]} zoom={12}>
                <StopsController/>
            </Map>

        </>
    )
}