"use server";

import { createClient } from "@/utils/supabase/server";
import { Position, Stop } from "@/app/lib/definitions";
import { ITEMS_PER_PAGE } from "@/app/lib/utils";

export async function getAllStops() {
  const supabase = await createClient();
  try {
    const queryBuilder = supabase
      .from("stops")
      .select("id, name, description, position")
      .order("id", { ascending: true });

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
          lat: stop.position.coordinates[0],
          lng: stop.position.coordinates[1],
        };

        return {
          ...stop,
          position,
        };
      });
      return stops;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch agencies");
  }
}
