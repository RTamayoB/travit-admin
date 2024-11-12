'use server';

import {getStopById} from "@/app/dashboard/stops/[id]/edit/data/get-stop-by-id";
import { editStopById } from "./data/edit-stop";
import EditStopLayout from "@/ui/dashboard/stops/edit/EditStopLayout";

export default async function Page({ params }: { params: { id: string } }) {
    const stop = await getStopById(params.id)

    const editStop = editStopById.bind(null, stop.id.toString())

    return (
        <EditStopLayout
            stop={stop}
            onSubmit={editStop}
        />
    )
}