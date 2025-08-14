import { createClient } from "@/utils/supabase/server";
import { Route } from "@/app/lib/definitions";

export async function getRouteById(routeId: string): Promise<Route | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("routes")
    .select(`
            id,
            short_name,
            long_name,
            agency_id,
            description,
            type,
            trips( id, headsign, short_name, direction, polyline, trip_builder)
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
    short_name: data.short_name,
    long_name: data.long_name,
    agency_id: data.agency_id,
    type: data.type,
    description: data.description,
    trips: data.trips
  };
}