'use server';

import { fetchStopById } from "./lib/get-stop-action";
import EditStopForm from "./ui/edit-stop-form";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const stop = await fetchStopById(id)

    return (
        <>
            <EditStopForm stop={stop} />
        </>
    )
}