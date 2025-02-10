"use server";

import { createClient } from "@/utils/supabase/server";
import { Position, Stop } from "@/app/lib/definitions";
import { ITEMS_PER_PAGE } from "@/app/lib/utils";

export async function getStopsByRange(
  query: string,
) {
  const supabase = await createClient();
  try {
    const queryBuilder = supabase
      .from("stops")
      .select("id, name, description, position")
      .order("id", { ascending: true });

    if (query) {
      queryBuilder
        .or(`name.ilike.%${query}%`);
    }

    const { data } = await queryBuilder;

    if (!data) {
      return [];
    }

    const stops: Stop[] = data.map((stop: any) => {
      const position: Position = {
        lat: stop.position.coordinates[0],
        lng: stop.position.coordinates[1],
      };

      return {
        ...stop,
        position,
      };
    });
    return stops;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch agencies");
  }
}
