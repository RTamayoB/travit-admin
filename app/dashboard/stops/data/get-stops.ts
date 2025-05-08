"use server";

import { createClient } from "@/utils/supabase/server";
import { Position, Stop } from "@/app/lib/definitions";
import { ITEMS_PER_PAGE } from "@/app/lib/utils";

export async function getAllStops() {
  const supabase = await createClient();
  try {
    const { count } = await supabase
      .from("stops")
      .select("*", { count: "exact", head: true });

    if (count) {
      const queryBuilder = supabase
        .from("stops")
        .select("id, name, description, position")
        .order("id", { ascending: true })
        .range(0, count - 1);

      const { data } = await queryBuilder;

      if (!data) {
        return [];
      }

      const stops: Stop[] = data.map((stop: any) => {
        const position: Position = {
          lng: stop.position.coordinates[0],
          lat: stop.position.coordinates[1]
        };

        return {
          ...stop,
          position,
        };
      });
      return stops;
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch stops");
  }
}

export async function getStopsByQuery(
  query: string,
) {
  const supabase = await createClient();
  console.log("QUERY IS " + query.length);
  try {
    if (query) {
      const queryBuilder = supabase
        .from("stops")
        .select("id, name, description, position")
        .order("id", { ascending: true })
        .or(`name.ilike.%${query}%`)
        .limit(ITEMS_PER_PAGE);

      const { data } = await queryBuilder;

      if (!data) {
        return [];
      }

      const stops: Stop[] = data.map((stop: any) => {
        const position: Position = {
          lng: stop.position.coordinates[0],
          lat: stop.position.coordinates[1]
        };

        return {
          ...stop,
          position,
        };
      });
      console.log("Stop Example:" + stops[0].position.lat + " , " + stops[0].position.lng)
      return stops;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch stops");
  }
}
