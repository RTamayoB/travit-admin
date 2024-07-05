'use server';

import ShowInfoButton from "@/app/dashboard/lines/test-page/ShowInfoButton";
import { getRouteById } from "./lib/new-actions";
import { fetchAllStops } from "../lib/get-all-stops-action";
import LineForm from "@/app/dashboard/lines/test-page/LineForm";
import { fetchAgencies } from "../create/lib/get-agencies-action";

export default async function Page() {

  const line = await getRouteById("1");
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