import { createStop } from "./data/create-stop";
import CreateStopLayout from "@/ui/dashboard/stops/create/CreateStopLayout";

export default async function Page() {

    return (
        <CreateStopLayout
            onSubmit={createStop}
        />
    )
}
