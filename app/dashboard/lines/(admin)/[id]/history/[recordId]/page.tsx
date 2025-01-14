"use server";

import { notFound } from "next/navigation";

import { getHistoryRecordById, restorePreviousState } from "./actions";
import HistoryRecordLayout from "@/ui/dashboard/lines/history/HistoryRecordLayout";

export default async function Page(props: { params: Promise<{ id: string, recordId: string }> }) {
  const params = await props.params;
  const historyRecord = await getHistoryRecordById(params.recordId);

  if (!historyRecord) {
    notFound();
  }

  return (
    <HistoryRecordLayout
      lineId={params.id}
      record={historyRecord}
      onRestoreState={restorePreviousState}
    />
  );
}