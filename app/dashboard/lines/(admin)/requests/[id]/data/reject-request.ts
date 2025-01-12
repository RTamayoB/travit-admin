"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LineChangeRequest } from "@/app/lib/definitions";

export async function rejectRequest(
  request: LineChangeRequest
) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("lines_change_requests")
      .update({ status: "rejected"})
      .eq("id", request.id)

    if(error) {
      return { message: "Database Error: Failed to approve request." };
    }

  } catch (error) {
    console.log("Error is " + error)
    return { message: "Database Error: Failed to approve request." };
  }

  revalidatePath("/dashboard/lines/requests");
  redirect("/dashboard/lines/requests");
}
