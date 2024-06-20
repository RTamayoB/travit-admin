import Breadcrumbs from "@/app/ui/lines/breadcrumbs";
import CreateStopForm from "./create-stop-form";

export default async function Page() {

    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {label: 'Paradas', href: '/dashboard/stops'},
                {
                    label: 'Crear parada',
                    href: '/dashboard/stops/create',
                    active: true
                },
                ]}
            />
            <CreateStopForm />
        </main>
    )
}