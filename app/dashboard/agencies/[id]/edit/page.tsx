'use server';

import Breadcrumbs from "@/ui/components/breadcrumbs/Breadcrumbs";
import { getAgencyById } from "./data/get-agency-by-id";
import AgencyForm from "@/shared/components/organisms/AgencyForm/AgencyForm";
import { editAgencyById } from "./data/edit-agency";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id
    const agency = await getAgencyById(id)

    const editAgency = editAgencyById.bind(null, agency.id.toString())

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
            <AgencyForm 
                agency={agency}
                onSubmit={editAgency}  
                submitButtonText="Editar Concesionaria"
            />
        </>
    )
}
