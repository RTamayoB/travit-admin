import { getAllStops } from "@/app/dashboard/lines/data/get-all-stops";
import { getAgenciesById } from "@/app/dashboard/lines/(admin)/create/data/get-agencies-by-id";
import { notFound } from "next/navigation";
import { getRouteById } from "../../data/get-route-by-id";
import EditRouteLayout from "./EditRouteLayout";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const route = await getRouteById(params.id);
  const agencies = await getAgenciesById();
  const stops = await getAllStops();

  if (!route) {
    notFound();
  }

  return (
    <EditRouteLayout
      agencies={agencies}
      stops={stops}
      route={route}
    />
  );
}