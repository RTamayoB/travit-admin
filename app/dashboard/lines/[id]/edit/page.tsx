'use server';

import { getRouteById } from "./lib/get-route-action";
import ShowInfoButton from "@/app/dashboard/lines/[id]/edit/ui/ShowInfoButton";
import {fetchAllStops} from "@/app/dashboard/lines/lib/get-all-stops-action";
import LineForm from "@/app/dashboard/lines/[id]/edit/ui/LineForm";
import {fetchAgencies} from "@/app/dashboard/lines/create/lib/get-agencies-action";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const line = await getRouteById(id);
  const stops = await fetchAllStops()
  const agencies = await fetchAgencies();

  return (
    <>
      <div>
        <ShowInfoButton />
        <LineForm
          line={line}
          agencies={agencies}
          stops={stops}
        />
      </div>
    </>
  )
}