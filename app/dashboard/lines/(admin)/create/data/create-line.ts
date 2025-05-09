"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LineSection, LineState, RoutePoint } from "@/app/lib/definitions";
import { LineSchema } from "@/app/lib/schemas";
import { FeatureCollection, LineString } from "geojson";

const CreateLine = LineSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export async function createLine(prevState: LineState, formData: FormData) {

  console.log("Line to create", formData.get("route"))

  const supabase = await createClient();

  // Parse and validate form data
  const parsedData = CreateLine.safeParse({
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
      message: "Campos faltantes. No se puede crear la Linea.",
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

  try {
    // Create line
    const {data: line, error: lineError } = await supabase
      .from("lines")
      .insert([{
        line_number: parsedData.data.line_number,
        legacy_line_number: parsedData.data.legacy_line_number,
        units: parsedData.data.units,
        agency_id: parsedData.data.agency_id,
        transport_type: parsedData.data.transport_type,
        line_type: parsedData.data.line_type,
        route_points: routePoints,
        route: route
      }])
      .select()
      .single();

    if (lineError) {
      throw lineError
    }

    const lineStops: {
      stop_id: number;
      line_id: number;
      stop_order: number;
    }[] = [];

    route.features.forEach((feature, index) => {
      if (index === 0 && feature.properties.startStop) {
        lineStops.push({
          stop_id: feature.properties.startStop.id,
          line_id: line.id,
          stop_order: 0
        });
      }

      if (feature.properties.endStop) {
        lineStops.push({
          stop_id: feature.properties.endStop.id,
          line_id: line.id,
          stop_order: index + 1
        });
      }
    });

    if (lineStops.length > 0) {
      const { error: stopError } = await supabase
        .from("line_stops")
        .insert(lineStops)

      if (stopError) {
        throw stopError
      }
    }
  } catch (error) {
    return {
      message: "Database Error: Failed to create Line.",
    };
  }

  revalidatePath("/dashboard/lines");
  redirect("/dashboard/lines");
}
