"use server";

import { getAllStops } from "@/app/dashboard/lines/data/get-all-stops";
import { notFound } from "next/navigation";
import { getLineById } from "../../../(admin)/[id]/edit/data/get-line-by-id";
import { getAgenciesById } from "../../../(admin)/create/data/get-agencies-by-id";
import EditRequestLineLayout from "@/ui/dashboard/lines/moderator/edit-request/EditRequestLineLayout";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [line, stops, agencies] = await Promise.all([
    getLineById(params.id),
    getAllStops(),
    getAgenciesById(),
  ]);

  if (!line) {
    notFound();
  }

  return (
    <EditRequestLineLayout
      stops={stops}
      agencies={agencies}
      line={line}
    />
  );
}
