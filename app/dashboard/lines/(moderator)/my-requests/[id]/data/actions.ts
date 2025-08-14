"use server";

import { createClient } from "@/utils/supabase/server";
import {
  Line,
  LineChangeRequest,
  LineSection,
  LineState,
  RoutePoint,
} from "@/app/lib/definitions";
import { LineSchema } from "@/app/lib/schemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { FeatureCollection, LineString } from "geojson";

export async function getLineRequestById(
  routeId: string,
): Promise<LineChangeRequest | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lines_change_requests")
    .select(`
            id,
            created_at,
            line_id,
            data,
            action,
            status,
            requester_name,
            notes
        `)
    .eq("id", routeId)
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
    data: data.data,
    requester_name: data.requester_name,
    action: data.action,
    status: data.status,
    notes: data.notes,
  };
}

const EditLine = LineSchema.omit({
  id: true
});

export async function editLineRequest(
  id: string,
  requestId: string,
  prevState: LineState,
  formData: FormData,
) {
  const supabase = await createClient();

  const userName = (await supabase.auth.getUser()).data.user?.email;

  // Parse and validate form data
  const parsedData = EditLine.safeParse({
    line_number: formData.get("line_number"),
    legacy_line_number: formData.get("legacy_line_number"),
    units: formData.get("units"),
    agency_id: formData.get("agency_id"),
    transport_type: formData.get("transport_type"),
    line_type: formData.get("line_type"),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Campos faltantes. No se pudo actualizar la Linea",
    };
  }

  const routePointsString = formData.get("route_points")?.toString();
  let routePoints: RoutePoint[] = [];
  if (routePointsString != null) {
    routePoints = JSON.parse(routePointsString);
  }

  const routeString = formData.get("route")?.toString();
  let route: FeatureCollection<LineString, LineSection> = { type: "FeatureCollection", features: [] };
  if (routeString != null) {
    route = JSON.parse(routeString);
  }

  // Create line object to parsed as data
  const line: Line = {
    id: parseInt(id),
    line_number: parsedData.data.line_number,
    legacy_line_number: parsedData.data.legacy_line_number,
    units: parsedData.data.units,
    agency_id: parsedData.data.agency_id,
    transport_type: parsedData.data.transport_type,
    line_type: parsedData.data.line_type,
    route_points: routePoints,
    route: route
  };

  const lineData = JSON.stringify(line);

  try {
    await supabase
      .from("lines_change_requests")
      .update([{
        data: lineData,
        requester_name: userName,
      }])
      .eq("id", requestId);
  } catch (error) {
    return { message: "Database Error: Failed to update Line." };
  }

  revalidatePath("/dashboard/lines");
  redirect("/dashboard/lines/");
}
