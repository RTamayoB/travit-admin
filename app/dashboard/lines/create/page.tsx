import {fetchAgencies} from "@/app/dashboard/lines/actions";
import Breadcrumbs from "@/app/ui/lines/breadcrumbs";
import CreateLineForm from "@/app/ui/lines/create-form";

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