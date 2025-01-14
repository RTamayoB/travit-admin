"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function addNotesToRequests(
  requestId: number,
  notes: string
) {
  const supabase = await createClient();
  try {
    await supabase
      .from("lines_change_requests")
      .update({ notes: notes})
      .eq("id", requestId);
  } catch (error) {
    console.log("Error is " + error)
    return { message: "Database Error: Failed to add notes to Request." };
  }

  revalidatePath("/dashboard/lines/requests");
  redirect("/dashboard/lines/requests");
}
