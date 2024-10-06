import Breadcrumbs from "../../.ui/breadcrumbs";
import CreateAgencyForm from "./ui/create-agency-form";

export default async function Page() {

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
            <CreateAgencyForm />
        </main>
    )
}
