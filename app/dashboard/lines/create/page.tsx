import Breadcrumbs from "@/app/dashboard/.ui/breadcrumbs";
import CreateLineForm from "./ui/create-line-form";
import { fetchAgencies } from "./lib/get-agencies-action";

export default async function Page() {
    const agencies = await fetchAgencies();

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
            <CreateLineForm agencies={agencies} />
        </main>
    )
}