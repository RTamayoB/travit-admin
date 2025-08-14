"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteRoute(id: string) {
  const supabase = await createClient();

  try {
    await supabase
      .from("routes")
      .delete()
      .eq("id", id);
    revalidatePath("/dashboard/routes");
    return { message: "Ruta eliminada." };
  } catch (error) {
    return { message: "Database Error: Failed to delete Route." };
  }
}