"use server";

import { getAllStops } from "@/app/dashboard/lines/data/get-all-stops";
import { notFound } from "next/navigation";
import { getAgenciesById } from "../../../(admin)/create/data/get-agencies-by-id";
import { getLineRequestById } from "./data/actions";
import LineRequestLayout from "../../../../../../ui/dashboard/lines/my-requests/LineRequestLayout";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [line, stops, agencies] = await Promise.all([
    getLineRequestById(params.id),
    getAllStops(),
    getAgenciesById(),
  ]);

  if (!line) {
    notFound();
  }

  return (
    <LineRequestLayout
      stops={stops}
      agencies={agencies}
      requestId={params.id}
      line={JSON.parse(line.data)}
    />
  );
}
