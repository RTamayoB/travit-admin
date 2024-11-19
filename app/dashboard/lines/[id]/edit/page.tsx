"use server";

import { getLineById } from "@/app/dashboard/lines/[id]/edit/data/get-line-by-id";
import { getAllStops } from "@/app/dashboard/lines/data/get-all-stops";
import { getAgenciesById } from "@/app/dashboard/lines/create/data/get-agencies-by-id";
import { editLine } from "./data/edit-line";
import EditLineLayout from "@/ui/dashboard/lines/edit/EditLineLayout";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [line, stops, agencies] = await Promise.all([
    getLineById(params.id),
    getAllStops(),
    getAgenciesById(),
  ]);

  const editCurrentLine = editLine.bind(null, line.id.toString());

  return (
    <EditLineLayout
      stops={stops}
      agencies={agencies}
      line={line}
      onSubmit={editCurrentLine}
    />
  );
}
