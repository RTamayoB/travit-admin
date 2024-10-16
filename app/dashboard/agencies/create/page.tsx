import AgencyForm from "@/shared/components/organisms/AgencyForm/AgencyForm";
import Breadcrumbs from "../../.ui/breadcrumbs";
import { createAgency } from "./data/create-agency";
import { Agency } from "@/app/lib/definitions";

export default async function Page() {

    const agency: Agency = {
        id: 0,
        name: ""
    }

    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {label: 'Agencias', href: '/dashboard/agencies'},
                {
                    label: 'Crear agencia',
                    href: '/dashboard/agencies/create',
                    active: true
                },
                ]}
            />
            <AgencyForm 
                agency={agency}
                onSubmit={createAgency}
                submitButtonText="Crear Concesionaria" 
            />
        </main>
    )
}
