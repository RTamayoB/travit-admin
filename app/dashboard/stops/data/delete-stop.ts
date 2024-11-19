"use server";

import { createClient } from "../../../../utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteStop(id: string) {
  const supabase = await createClient();

  try {
    await supabase
      .from("stops")
      .delete()
      .eq("id", id);
    revalidatePath("/dashboard/stops");
    return { message: "Parada eliminada." };
  } catch (error) {
    return { message: "Database Error: Failed to delete Stop." };
  }
}
