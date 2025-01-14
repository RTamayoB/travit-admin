"use server";

import { createClient } from "@/utils/supabase/server";
import {
  LineHistory,
} from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getHistoryRecordById(
  recordId: string,
): Promise<LineHistory | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("line_history")
    .select(`
            id,
            created_at,
            line_id,
            action,
            old_data,
            new_data
        `)
    .eq("id", recordId)
    .single();

  if (!data) {
    console.log("Was null");
    return null;
  }

  if (error) {
    throw error;
  }
  return {
    id: data.id,
    created_at: data.created_at,
    line_id: data.line_id,
    action: data.action,
    old_data: data.old_data,
    new_data: data.new_data
  };
}

export async function restorePreviousState(lineId: string, record: LineHistory) {
  const supabase = await createClient();

  const line = record.old_data

  const { error } = await supabase
    .from("lines")
    .update([{
      line_number: line.line_number,
      legacy_line_number: line.legacy_line_number,
      units: line.units,
      agency_id: line.agency_id,
      transport_type: line.transport_type,
      line_type: line.line_type,
      route_points: line.route_points,
    }])
    .eq("id", lineId)

  if (error) {
    return { message: "Error restoring previous state" }
  }

  revalidatePath("/dashboard/lines/");
  redirect("/dashboard/lines/");
}