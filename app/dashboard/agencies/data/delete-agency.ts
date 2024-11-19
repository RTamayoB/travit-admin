"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteAgency(id: string) {
  const supabase = await createClient();

  try {
    await supabase
      .from("agencies")
      .delete()
      .eq("id", id);

    revalidatePath("/dashboard/agencies");
    return { message: "Agencia eliminada." };
  } catch (error) {
    return { message: "Dabatase Error: Failed to delete agency." };
  }
}
