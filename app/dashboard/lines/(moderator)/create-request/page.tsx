import { getAllStops } from "@/app/dashboard/lines/data/get-all-stops";
import { getAgenciesById } from "../../(admin)/create/data/get-agencies-by-id";
import CreateLineRequestLayout from "@/ui/dashboard/lines/moderator/create-request/CreateLineRequestLayout";

export default async function Page() {
  const agencies = await getAgenciesById();
  const stops = await getAllStops();

  return (
    <CreateLineRequestLayout
      stops={stops}
      agencies={agencies}
    />
  );
}
