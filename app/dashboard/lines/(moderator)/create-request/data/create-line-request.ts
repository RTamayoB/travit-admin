"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Line, LineState, RoutePoint } from "@/app/lib/definitions";
import { LineSchema } from "@/app/lib/schemas";

const CreateLine = LineSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export async function createLineRequest(
  prevState: LineState,
  formData: FormData,
) {
  const supabase = await createClient();

  const userName = (await supabase.auth.getUser()).data.user?.email;

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

  // Create line object to parsed as data
  const line: Line = {
    id: 0,
    line_number: parsedData.data.line_number,
    legacy_line_number: parsedData.data.legacy_line_number,
    units: parsedData.data.units,
    agency_id: parsedData.data.agency_id,
    transport_type: parsedData.data.transport_type,
    line_type: parsedData.data.line_type,
    route_points: routePoints,
  };

  const lineData = JSON.stringify(line);

  try {
    // Create line
    await supabase
      .from("lines_change_requests")
      .insert([{
        line_id: null,
        data: lineData,
        action: "I",
        requester_name: userName,
      }])
      .select()
      .single();
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to create Line Request.",
    };
  }

  revalidatePath("/dashboard/lines");
  redirect("/dashboard/lines");
}
