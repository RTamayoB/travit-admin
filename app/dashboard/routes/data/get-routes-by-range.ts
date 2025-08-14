"use server";

import { ITEMS_PER_PAGE } from "@/app/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Route, RoutePoint } from "@/app/lib/definitions";
import { QueryData } from "@supabase/supabase-js";

export async function getRoutesByRange(
  query: string,
  currentPage: number,
) {
  const supabase = await createClient();

  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE;

  const queryBuilder = supabase
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
    .range(from, to)
    .limit(ITEMS_PER_PAGE);

  if (query) {
    queryBuilder
      .or(`short_name.ilike.%${query}%, long_name.ilike.%${query}%`);
  }

  const { data } = await queryBuilder;

  if (!data) {
    return [];
  }

  const routes: Route[] = data.map((route: Route) => {
    return {
      id: route.id,
      short_name: route.short_name,
      long_name: route.long_name,
      agency_id: route.agency_id,
      description: route.description,
      type: route.type,
      trips: route.trips
    };
  });

  return routes;
}
