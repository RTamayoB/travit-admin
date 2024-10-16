import StopForm from "@/shared/components/organisms/StopForm/StopForm";
import Breadcrumbs from "../../.ui/breadcrumbs";
import { createStop } from "./data/create-stop";
import { Position, Stop } from "@/app/lib/definitions";

export default async function Page() {

    const position: Position = {
        lat: 0,
        lng: 0
    }

    const stop: Stop = {
        id: 0,
        name: "",
        description: "",
        position: position
    }

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
            <StopForm
                stop={stop}
                onSubmit={createStop}
                submitButtonText="Crear Parada"
            />
        </main>
    )
}
