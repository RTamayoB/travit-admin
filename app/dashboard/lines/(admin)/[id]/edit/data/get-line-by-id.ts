import { createClient } from "@/utils/supabase/server";
import { Line } from "@/app/lib/definitions";

export async function getLineById(routeId: string): Promise<Line | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lines")
    .select(`
            id,
            line_number,
            legacy_line_number,
            units,
            agency_id,
            transport_type,
            line_type,
            route_points
        `)
    .eq("id", routeId)
    .single();

  if (!data) {
    return null;
  }

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    line_number: data.line_number,
    legacy_line_number: data.legacy_line_number,
    units: data.units,
    agency_id: data.agency_id,
    transport_type: data.transport_type,
    line_type: data.line_type,
    route_points: data.route_points,
  };
}
