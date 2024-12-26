import { getAllStops } from "@/app/dashboard/lines/data/get-all-stops";
import { getAgenciesById } from "../../(admin)/create/data/get-agencies-by-id";
import CreateRequestLineLayout from "@/ui/dashboard/lines/moderator/create-request/CreateRequestLineLayout";

export default async function Page() {
  const agencies = await getAgenciesById();
  const stops = await getAllStops();

  return (
    <CreateRequestLineLayout
      stops={stops}
      agencies={agencies}
    />
  );
}
