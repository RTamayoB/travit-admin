"use server";

import { ITEMS_PER_PAGE } from "@/app/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { Line, RoutePoint } from "@/app/lib/definitions";

export async function getLinesByRange(
  query: string,
  currentPage: number,
) {
  const supabase = await createClient();

  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE;

  const queryBuilder = supabase
    .from("lines")
    .select(`
            id,
            line_number,
            legacy_line_number,
            units,
            agency_id,
            transport_type,
            line_type,
            route_points,
            route
        `)
    .range(from, to)
    .limit(ITEMS_PER_PAGE);

  if (query) {
    queryBuilder
      .or(`line_number.ilike.%${query}%, legacy_line_number.ilike.%${query}%`);
  }

  const { data } = await queryBuilder;

  if (!data) {
    return [];
  }

  const lines: Line[] = data.map((line: Line) => {
    return {
      id: line.id,
      line_number: line.line_number,
      legacy_line_number: line.legacy_line_number,
      units: line.units,
      agency_id: line.agency_id,
      transport_type: line.transport_type,
      line_type: line.line_type,
      route_points: line.route_points as RoutePoint[],
      route: line.route
    };
  });

  return lines;
}
