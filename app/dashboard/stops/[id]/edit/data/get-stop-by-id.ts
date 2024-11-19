"use server";

import { Position, Stop } from "@/app/lib/definitions";
import { createClient } from "@/utils/supabase/server";

export async function getStopById(id: string) {
  const supabase = await createClient();

  try {
    const queryBuilder = supabase
      .from("stops")
      .select("id, name, description, position")
      .eq("id", id)
      .single();

    const { data, error } = await queryBuilder;

    if (!data) {
      return null;
    }

    // Check if data exists and handle the error case
    if (error) {
      throw error;
    }

    const position: Position = data.position
      ? {
        lat: data.position.coordinates[0],
        lng: data.position.coordinates[1],
      }
      : { lat: null, lng: null };

    const stop: Stop = {
      id: data.id,
      name: data.name,
      description: data.description,
      position,
    };

    return stop;
  } catch (error) {
    throw new Error("Failed to fetch stops");
  }
}
