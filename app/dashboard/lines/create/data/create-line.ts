"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RoutePoint } from "@/app/lib/definitions";
import { LineSchema } from "@/app/lib/schemas";

const CreateLine = LineSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export async function createLine(formData: FormData) {
  const supabase = createClient();

  // Parse and validate form data
  const parsedData = CreateLine.parse({
    line_number: formData.get("line_number"),
    legacy_line_number: formData.get("legacy_line_number"),
    units: formData.get("units"),
    agency_id: formData.get("agency_id"),
    transport_type: formData.get("transport_type"),
    line_type: formData.get("line_type"),
  });

  const routePointsString = formData.get("routePoints")?.toString();
  let routePoints: RoutePoint[] = [];
  if (routePointsString != null) {
    routePoints = JSON.parse(routePointsString);
  }

  try {
    // Create line
    await supabase
      .from("lines")
      .insert([{
        line_number: parsedData.line_number,
        legacy_line_number: parsedData.legacy_line_number,
        units: parsedData.units,
        agency_id: parsedData.agency_id,
        transport_type: parsedData.transport_type,
        line_type: parsedData.line_type,
        route_points: routePoints,
      }])
      .select()
      .single();
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to save line");
  }

  revalidatePath("/dashboard/lines");
  redirect("/dashboard/lines");
}
