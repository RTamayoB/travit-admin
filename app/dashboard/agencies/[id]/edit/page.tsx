'use server';

import Breadcrumbs from "@/app/dashboard/.ui/breadcrumbs";
import { getAgencyById } from "./data/get-agency-by-id";
import EditAgencyForm from "./ui/edit-agency-form";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const agency = await getAgencyById(id)

    return (
        <>
            <Breadcrumbs breadcrumbs={[
                             {label: 'Concesionarias', href: '/dashboard/agencies'},
                             {
                                 label: 'Editar concesionaria',
                                 href: `/dashboard/agencies/${id}/edit`,
                                 active: true
                             },
                             ]}
            />
            <EditAgencyForm agency={agency} />
        </>
    )
}