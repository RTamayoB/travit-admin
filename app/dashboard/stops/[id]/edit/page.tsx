'use server';

import EditStopForm from "@/app/dashboard/stops/[id]/edit/edit-stop-form";
import {fetchStopById} from "@/app/dashboard/stops/[id]/edit/actions";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const stop = await fetchStopById(id)

    return (
        <>
            <EditStopForm stop={stop} />
        </>
    )
}