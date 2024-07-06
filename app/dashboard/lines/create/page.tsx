import Breadcrumbs from "@/app/dashboard/.ui/breadcrumbs";
import { fetchAgencies } from "./lib/get-agencies-action";
import CreateLineForm from "@/app/dashboard/lines/create/ui/create-line-form";
import { fetchAllStops } from "../lib/get-all-stops-action";
import { Route } from "@/app/lib/definitions";

export default async function Page() {
    const agencies = await fetchAgencies();
    const stops = await fetchAllStops()
    const line: Route = {
        id: 0,
        created_at: "",
        updated_at: "",
        line_number: "",
        legacy_line_number: "",
        units: 0,
        agency_id: 0,
        transport_type: "",
        line_type: "",
        points: []
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