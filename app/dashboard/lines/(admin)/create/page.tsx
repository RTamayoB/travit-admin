import { getAllStops } from "@/app/dashboard/lines/data/get-all-stops";
import CreateLineLayout from "@/ui/dashboard/lines/admin/create/CreateLineLayout";
import { getAgenciesById } from "./data/get-agencies-by-id";

export default async function Page() {
  const agencies = await getAgenciesById();
  const stops = await getAllStops();

  return (
    <CreateLineLayout
      stops={stops}
      agencies={agencies}
    />
  );
}
