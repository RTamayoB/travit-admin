"use server";

import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { Agency } from "@/app/lib/definitions";

export async function getAgenciesById(): Promise<Agency[]> {
  noStore();

  const supabase = await createClient();

  try {
    const queryBuilder = supabase
      .from("agencies")
      .select("id, name")
      .order("id", { ascending: true });
    const { data } = await queryBuilder;
    return data as Agency[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch agencies");
  }
}
