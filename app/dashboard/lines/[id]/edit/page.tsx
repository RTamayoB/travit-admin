'use server';

import ShowInfoButton from "@/app/dashboard/lines/[id]/edit/ui/ShowInfoButton";
import LineForm from "@/app/dashboard/lines/[id]/edit/ui/LineForm";
import {getLineById} from "@/app/dashboard/lines/[id]/edit/data/get-line-by-id";
import {getAllStops} from "@/app/dashboard/lines/data/get-all-stops";
import {getAgenciesById} from "@/app/dashboard/lines/create/data/get-agencies-by-id";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id
  const line = await getLineById(id);
  const stops = await getAllStops()
  const agencies = await getAgenciesById();

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
