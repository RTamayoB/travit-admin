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

    let lineId = request.line_id;

    if(request.action == "I") {
      const { data: inserted, error: insertError } = await supabase
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
        .select()
        .single()

      if (insertError) throw insertError;
      lineId = inserted.id;
    } else if (request.action == "U") {
      const { error: updateLineError } = await supabase
        .from("lines")
        .update(lineData)
        .eq("id", request.line_id)

      if (updateLineError) throw updateLineError;

      await supabase
        .from("line_stops")
        .delete()
        .eq("line_id", lineId);
    }

    // Build and insert new line_stops for both I and U
    if (lineData.route && lineId) {
      const lineStops: {
        stop_id: number;
        line_id: number;
        stop_order: number;
      }[] = [];

      lineData.route.features.forEach((feature, index) => {
        if (index === 0 && feature.properties.startStop) {
          lineStops.push({
            stop_id: feature.properties.startStop.id,
            line_id: lineId,
            stop_order: 0,
          });
        }

        if (feature.properties.endStop) {
          lineStops.push({
            stop_id: feature.properties.endStop.id,
            line_id: lineId,
            stop_order: index + 1,
          });
        }
      });

      if (lineStops.length > 0) {
        const { error: stopInsertError } = await supabase
          .from("line_stops")
          .insert(lineStops);

        if (stopInsertError) throw stopInsertError;
      }
    }

  } catch (error) {
    console.log("Error is " + error)
    return { message: "Database Error: Failed to approve request." };
  }

  revalidatePath("/dashboard/lines/requests");
  redirect("/dashboard/lines/requests");
}
