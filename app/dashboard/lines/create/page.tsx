import Breadcrumbs from "@/app/dashboard/.ui/breadcrumbs";
import CreateLineForm from "@/app/dashboard/lines/create/ui/create-line-form";
import { Line } from "@/app/lib/definitions";
import {getAllStops} from "@/app/dashboard/lines/data/get-all-stops";
import {getAgenciesById} from "@/app/dashboard/lines/create/data/get-agencies-by-id";

export default async function Page() {
    const agencies = await getAgenciesById();
    const stops = await getAllStops()
    const line: Line = {
        id: 0,
        created_at: "",
        updated_at: "",
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
                {label: 'Invoices', href: '/dashboard/lines'},
                {
                    label: 'Create Invoice',
                    href: '/dashboard/invoices/create',
                    active: true
                },
                ]}
            />
            <CreateLineForm stops={stops} agencies={agencies} line={line}/>
        </main>
    );
}
