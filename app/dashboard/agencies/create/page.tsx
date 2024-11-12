import { createAgency } from "./data/create-agency";
import CreateAgencyLayout from "@/ui/dashboard/agencies/create/CreateAgencyLayout";

export default async function Page() {

    return (
        <CreateAgencyLayout
            onSubmit={createAgency}
        />
    )
}
