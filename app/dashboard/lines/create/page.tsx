import Breadcrumbs from "@/ui/components/breadcrumbs/Breadcrumbs";
import { Line } from "@/app/lib/definitions";
import {getAllStops} from "@/app/dashboard/lines/data/get-all-stops";
import {getAgenciesById} from "@/app/dashboard/lines/create/data/get-agencies-by-id";
import { createLine } from "./data/create-line";
import LineForm from "@/shared/components/organisms/LineForm/LineForm";

export default async function Page() {
    const agencies = await getAgenciesById();
    const stops = await getAllStops()
    const line: Line = {
        id: 0,
        line_number: "",
        legacy_line_number: "",
        units: 0,
        agency_id: 0,
        transport_type: "",
        line_type: "",
        route_points: []
    }

    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                {label: 'Lineas', href: '/dashboard/lines'},
                {
                    label: 'Crear Linea',
                    href: '/dashboard/lines/create',
                    active: true
                },
                ]}
            />
            <LineForm 
                stops={stops} 
                agencies={agencies} 
                line={line} 
                onSubmit={createLine}
                submitButtonText="Crear Linea"
            />
        </main>
    );
}
