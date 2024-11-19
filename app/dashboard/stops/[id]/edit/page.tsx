"use server";

import { getStopById } from "@/app/dashboard/stops/[id]/edit/data/get-stop-by-id";
import EditStopLayout from "@/ui/dashboard/stops/edit/EditStopLayout";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const stop = await getStopById(params.id);

  if (!stop) {
    notFound();
  }

  return (
    <EditStopLayout
      stop={stop}
    />
  );
}
