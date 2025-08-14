"use server";

import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { ITEMS_PER_PAGE } from "@/app/lib/utils";

export async function getRoutesPageCount(query: string) {
  const supabase = await createClient();

  noStore();

  try {
    const queryBuilder = supabase
      .from("routes")
      .select("*", { count: "exact" });

    if (query) {
      queryBuilder
        .or(
          `short_name.ilike.%${query}%, long_name.ilike.%${query}%`,
        );
    }
    const { count } = await queryBuilder;
    return Math.ceil(Number(count || 1) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of routes.");
  }
}