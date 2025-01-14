"use server";

import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { ITEMS_PER_PAGE } from "@/app/lib/utils";

export async function getHistoryForLinesPageCount(id: number) {
  const supabase = await createClient();

  noStore();

  try {
    const queryBuilder = supabase
      .from("line_history")
      .select("*", { count: "exact" })
      .eq("line_id", id);

    const { count } = await queryBuilder;
    console.log("Pure count", count);
    const amount = Math.ceil(Number(count || 1) / ITEMS_PER_PAGE);
    console.log(amount);
    return amount;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of lines.");
  }
}
