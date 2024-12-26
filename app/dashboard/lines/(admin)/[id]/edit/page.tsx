"use server";

import { getAllStops } from "@/app/dashboard/lines/data/get-all-stops";
import EditLineLayout from "@/ui/dashboard/lines/admin/edit/EditLineLayout";
import { notFound } from "next/navigation";
import { getAgenciesById } from "../../create/data/get-agencies-by-id";
import { getLineById } from "./data/get-line-by-id";

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
    <EditLineLayout
      stops={stops}
      agencies={agencies}
      line={line}
    />
  );
}
