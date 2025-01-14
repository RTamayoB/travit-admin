"use server";

import { notFound } from "next/navigation";
import { getLineRequestById } from "../../../(moderator)/my-requests/[id]/data/actions";
import { getAgencyById } from "./data/get-agency-by-id";
import { Line } from "@/app/lib/definitions";
import { addNotesToRequests } from "./data/add-notes-to-request";
import { approveRequest } from "./data/approve-request";
import { rejectRequest } from "./data/reject-request";
import ReviewRequestLayout from "@/ui/dashboard/lines/requests/ReviewRequestLayout";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const request = await getLineRequestById(params.id);
  const line = JSON.parse(request?.data!!) as Line
  const agency = await getAgencyById(line.agency_id)

  if (!request) {
    notFound();
  }

  return (
    <ReviewRequestLayout
      agency={agency}
      request={request}
      onNotesAdded={addNotesToRequests}
      onRequestApproved={approveRequest}
      onRequestRejected={rejectRequest}
    />
  );
}
