"use server";

import { ITEMS_PER_PAGE } from "@/app/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { LineHistory } from "@/app/lib/definitions";
import { jwtDecode } from "jwt-decode";

export async function getHistoryForLineByRange(
  id: number,
  currentPage: number,
) {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    const jwt: { user_role: string } = jwtDecode(session.access_token);
    console.log(jwt.user_role);
  }

  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE;

  console.log("ID is " + id);
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
    .eq("line_id", id)
    .range(from, to)
    .limit(ITEMS_PER_PAGE);

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
