'use server';

import { getAgencyById } from "./data/get-agency-by-id";
import { editAgencyById } from "./data/edit-agency";
import EditAgencyLayout from "@/ui/dashboard/agencies/edit/EditAgencyLayout";

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const agency = await getAgencyById(params.id)

    const editAgency = editAgencyById.bind(null, agency.id.toString())

    return (
        <EditAgencyLayout
            agency={agency}
            onSubmit={editAgency}
        />
    )
}
