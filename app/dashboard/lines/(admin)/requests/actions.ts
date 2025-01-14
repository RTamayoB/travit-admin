"use server";

import { Action, LineChangeRequest, RequestStatus } from "@/app/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { ITEMS_PER_PAGE } from "@/app/lib/utils";
import { revalidatePath } from "next/cache";

export async function getAllLineRequestsByRange(
  query: string,
  currentPage: number,
) {
  const supabase = await createClient();

  const from = (currentPage - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE;

  const queryBuilder = supabase
    .from("lines_change_requests")
    .select(`
            id,
            created_at,
            line_id,
            data,
            action,
            status,
            requester_name,
            notes
        `)
    .range(from, to)
    .order("created_at")
    .limit(ITEMS_PER_PAGE);

  const { data } = await queryBuilder;

  if (!data) {
    return [];
  }

  const requests: LineChangeRequest[] = data.map((request: LineChangeRequest) => {
    const date = new Date(request.created_at);

    return {
      id: request.id,
      created_at: date.toLocaleString(),
      line_id: request.line_id ? request.line_id : 0,
      data: request.data,
      requester_name: request.requester_name,
      action: request.action as Action,
      status: request.status as RequestStatus,
      notes: request.notes,
    };
  });

  return requests;
}

export async function getAllLineRequestsPageCount(query: string) {
  const supabase = await createClient();

  noStore();

  try {
    const queryBuilder = supabase
      .from("lines_change_requests")
      .select("*", { count: "exact" });

    const { count } = await queryBuilder;
    console.log("Pure count", count);
    return Math.ceil(Number(count || 1) / ITEMS_PER_PAGE);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of line requests.");
  }
}

export async function deleteLineRequest(id: string) {
  const supabase = await createClient();

  try {
    await supabase
      .from("lines_change_requests")
      .delete()
      .eq("id", id);
    revalidatePath("/dashboard/lines/my-requests");
    return { message: "Solicitud eliminada." };
  } catch (error) {
    return { message: "Database Error: Failed to delete Line Request." };
  }
}
