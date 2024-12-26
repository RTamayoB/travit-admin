import { createClient } from "@/utils/supabase/server";
import { Line, LineRequest } from "@/app/lib/definitions";

export async function getLineRequestById(routeId: string): Promise<LineRequest | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
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
    .eq("id", routeId)
    .single();

  if (!data) {
    console.log("Was null")
    return null;
  }

  if (error) {
    throw error;
  }

  return {
    id: data.id,
    created_at: data.created_at,
    line_id: data.line_id,
    data: data.data,
    requester_name: data.requester_name,
    action: data.action,
    status: data.status,
    notes: data.notes
  };
}
