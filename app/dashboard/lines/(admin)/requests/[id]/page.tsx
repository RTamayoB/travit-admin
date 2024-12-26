"use server";

import { getAllStops } from "@/app/dashboard/lines/data/get-all-stops";
import { notFound } from "next/navigation";
import { getAgenciesById } from "../../../(admin)/create/data/get-agencies-by-id";
import ReviewRequestLayout from "./ReviewRequestLayout";
import { getLineRequestById } from "../../../(moderator)/my-requests/[id]/data/actions";

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
    <ReviewRequestLayout
      stops={stops}
      agencies={agencies}
      line={JSON.parse(line.data)}
    />
  );
}
