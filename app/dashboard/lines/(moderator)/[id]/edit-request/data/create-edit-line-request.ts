"use server";

import { createClient } from "../../../../../../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Line, LineSection, LineState, RoutePoint } from "@/app/lib/definitions";
import { LineSchema } from "@/app/lib/schemas";
import { FeatureCollection, LineString } from "geojson";

const EditLine = LineSchema.omit({
  id: true
});

export async function createEditLineRequest(
  id: string,
  prevState: LineState,
  formData: FormData,
) {
  const supabase = await createClient();

  const userName = (await supabase.auth.getUser()).data.user?.email;

  const queryBuilder = supabase
    .from("lines_change_requests")
    .select("*", { count: "exact" })
    .eq("line_id", id);

  const { count } = await queryBuilder;
  console.log("Pure count", count);
  if (count) {
    if (count != 0) {
      return {
        message:
          "Ya tienes una solicitud activa para esta linea. Edita la solicitud actual o espera una resolucion a tu solicitud actual.",
      };
    }
  }

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
  var line: Line = {
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
      .insert([{
        line_id: id,
        data: lineData,
        action: "U",
        requester_name: userName,
      }]);
  } catch (error) {
    return { message: "Database Error: Failed to update Line." };
  }

  revalidatePath("/dashboard/lines");
  redirect("/dashboard/lines/");
}
