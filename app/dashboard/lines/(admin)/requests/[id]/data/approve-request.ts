"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Line, LineChangeRequest } from "@/app/lib/definitions";

export async function approveRequest(
  request: LineChangeRequest
) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("lines_change_requests")
      .update({ status: "approved"})
      .eq("id", request.id)
      .select();

    if(error) {
      return { message: "Database Error: Failed to approve request." };
    }

    const lineData = JSON.parse(request.data) as Line

    if(request.action == "I") {
      await supabase
        .from("lines")
        .insert([{
          line_number: lineData.line_number,
          legacy_line_number: lineData.legacy_line_number,
          units: lineData.units,
          agency_id: lineData.agency_id,
          transport_type: lineData.transport_type,
          line_type: lineData.line_type,
          route_points: lineData.route_points,
          route: lineData.route
        }])
    } else if (request.action == "U") {
      await supabase
        .from("lines")
        .update(lineData)
        .eq("id", request.line_id)
    }

  } catch (error) {
    console.log("Error is " + error)
    return { message: "Database Error: Failed to approve request." };
  }

  revalidatePath("/dashboard/lines/requests");
  redirect("/dashboard/lines/requests");
}
