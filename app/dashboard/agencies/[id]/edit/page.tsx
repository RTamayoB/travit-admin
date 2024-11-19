"use server";

import { getAgencyById } from "./data/get-agency-by-id";
import EditAgencyLayout from "@/ui/dashboard/agencies/edit/EditAgencyLayout";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const agency = await getAgencyById(params.id);

  if (!agency) {
    notFound();
  }

  return (
    <EditAgencyLayout
      agency={agency}
    />
  );
}
