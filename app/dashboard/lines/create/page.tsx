import {getAllStops} from "@/app/dashboard/lines/data/get-all-stops";
import {getAgenciesById} from "@/app/dashboard/lines/create/data/get-agencies-by-id";
import { createLine } from "./data/create-line";
import CreateLineLayout from "@/ui/dashboard/lines/create/CreateLineLayout";

export default async function Page() {
    const agencies = await getAgenciesById();
    const stops = await getAllStops()

    return (
        <CreateLineLayout
            stops={stops}
            agencies={agencies}
            onSubmit={createLine}
        />
    );
}
