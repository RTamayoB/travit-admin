"use server";

import { createClient } from "../../../../../../utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteLine(id: string) {
  const supabase = await createClient();

  try {
    await supabase
      .from("lines")
      .delete()
      .eq("id", id);
    revalidatePath("/dashboard/lines");
    return { message: "Linea eliminada." };
  } catch (error) {
    return { message: "Database Error: Failed to delete Line." };
  }
}
