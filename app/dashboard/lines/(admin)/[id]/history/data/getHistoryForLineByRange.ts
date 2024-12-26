"use server";

import { ITEMS_PER_PAGE } from "@/app/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { LineHistory } from "@/app/lib/definitions";

export async function getHistoryForLineByRange(
  query: string,
  currentPage: number,
) {
  const supabase = await createClient();

  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE;


  console.log("ID is " + query)
  const queryBuilder = supabase
    .from("line_history")
    .select(`
            id,
            created_at,
            line_id,
            action,
            old_data,
            new_data
        `)
    .eq("id", query)
    .range(from, to)
    .limit(ITEMS_PER_PAGE);

  if (query) {
    queryBuilder
      .or(`id.ilike.%${query}%, id.ilike.%${query}%`);
  }

  const { data } = await queryBuilder;

  if (!data) {
    return [];
  }

  const lines: LineHistory[] = data.map((line: LineHistory) => {
    return {
      id: line.id,
      created_at: line.created_at,
      line_id: line.line_id,
      action: line.action,
      old_data: line.old_data,
      new_data: line.new_data,
    };
  });

  return lines;
}