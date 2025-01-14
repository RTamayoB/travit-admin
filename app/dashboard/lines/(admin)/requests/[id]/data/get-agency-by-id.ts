"use server";

import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { Agency } from "@/app/lib/definitions";

export async function getAgencyById(agency_id: number): Promise<Agency> {
  noStore();

  const supabase = await createClient();

  try {
    const queryBuilder = supabase
      .from("agencies")
      .select("id, name")
      .eq("id", agency_id)
      .single();
    const { data } = await queryBuilder;
    return data as Agency;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch agency");
  }
}