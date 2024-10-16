'use server';

import Breadcrumbs from "@/app/dashboard/.ui/breadcrumbs";
import {getStopById} from "@/app/dashboard/stops/[id]/edit/data/get-stop-by-id";
import { editStopById } from "./data/edit-stop";
import StopForm from "@/shared/components/organisms/StopForm/StopForm";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const stop = await getStopById(id)

    const editStop = editStopById.bind(null, stop.id.toString())

    return (
        <>
            <Breadcrumbs breadcrumbs={[
                             {label: 'Paradas', href: '/dashboard/stops'},
                             {
                                 label: 'Editar parada',
                                 href: `/dashboard/stops/${id}/edit`,
                                 active: true
                             },
                             ]}
            />
            <StopForm 
                stop={stop}
                onSubmit={editStop} 
                submitButtonText="Editar Parada"
            />
        </>
    )
}