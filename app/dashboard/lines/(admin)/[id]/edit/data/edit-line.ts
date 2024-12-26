"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { LineState, RoutePoint } from "@/app/lib/definitions";
import { LineSchema } from "@/app/lib/schemas";
import { createClient } from "@/utils/supabase/server";

const EditLine = LineSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export async function editLine(
  id: string,
  prevState: LineState,
  formData: FormData,
) {
  const supabase = await createClient();

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

  try {
    await supabase
      .from("lines")
      .update([{
        line_number: parsedData.data.line_number,
        legacy_line_number: parsedData.data.legacy_line_number,
        units: parsedData.data.units,
        agency_id: parsedData.data.agency_id,
        transport_type: parsedData.data.transport_type,
        line_type: parsedData.data.line_type,
        route_points: routePoints,
      }])
      .eq("id", id);
  } catch (error) {
    return { message: "Database Error: Failed to update Line." };
  }

  revalidatePath("/dashboard/lines");
  redirect("/dashboard/lines/");
}
