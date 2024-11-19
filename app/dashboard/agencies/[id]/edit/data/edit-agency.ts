"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AgencySchema } from "@/app/lib/schemas";
import { AgencyState } from "@/app/lib/definitions";

const EditAgency = AgencySchema.omit({ id: true, created_at: true });

export async function editAgencyById(
  id: string,
  prevState: AgencyState,
  formData: FormData,
) {
  const supabase = await createClient();

  const parsedData = EditAgency.safeParse({
    name: formData.get("name"),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Campos faltantes. No se pudo actualizar la Linea",
    };
  }

  try {
    await supabase
      .from("agencies")
      .update([
        {
          name: parsedData.data.name,
        },
      ])
      .eq("id", id);
  } catch (error) {
    return { message: "Database Error: Failed to update Agency." };
  }

  revalidatePath("/dashboard/agencies");
  redirect("/dashboard/agencies/");
}
