import { getAllStops } from "@/app/dashboard/lines/data/get-all-stops";
import { getAgenciesById } from "../../lines/(admin)/create/data/get-agencies-by-id";
import CreateRouteLayout from "./CreateRouteLayout";

export default async function Page() {
  const agencies = await getAgenciesById();
  const stops = await getAllStops();

  return (
    <CreateRouteLayout 
      agencies={agencies}
      stops={stops}
    />
  );
}