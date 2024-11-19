"use server";

import { Agency } from "@/app/lib/definitions";
import { createClient } from "@/utils/supabase/server";

export async function getAgencyById(id: string) {
  const supabase = await createClient();

  try {
    const queryBuilder = supabase
      .from("agencies")
      .select("id, name")
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

    const agency: Agency = {
      id: data.id,
      name: data.name,
    };

    return agency;
  } catch (error) {
    throw new Error("Failed to fetch agencies");
  }
}
