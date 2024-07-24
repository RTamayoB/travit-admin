'use server';

import EditStopForm from "./ui/edit-stop-form";
import {getStopById} from "@/app/dashboard/stops/[id]/edit/data/get-stop-by-id";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const stop = await getStopById(id)

    return (
        <>
            <EditStopForm stop={stop} />
        </>
    )
}