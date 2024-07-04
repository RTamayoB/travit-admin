import StopMarker from "@/app/dashboard/lines/ui/StopMarker";
import {Stop} from "@/app/lib/definitions";

export default function LineStopsDrawer({
        initialStops,
}: {
        initialStops: Stop[],
}) {

    return (
        <>
            {initialStops.map((stop) => (
                    <StopMarker
                        key={stop.id}
                        index={stop.id}
                        initialPosition={stop.position}
                    />
                ))
            };
        </>
        )
}