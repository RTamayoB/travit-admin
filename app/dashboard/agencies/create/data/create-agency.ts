"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AgencyState } from "@/app/lib/definitions";
import { AgencySchema } from "@/app/lib/schemas";

const CreateAgency = AgencySchema.omit({ id: true });

export async function createAgency(prevState: AgencyState, formData: FormData) {
  const supabase = await createClient();

  const parsedData = CreateAgency.safeParse({
    name: formData.get("name"),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Campos faltantes. No se puede crear la Concesionaria.",
    };
  }

  try {
    await supabase
      .from("agencies")
      .insert([
        {
          name: parsedData.data.name,
        },
      ]);
  } catch (error) {
    return {
      message: "Database Error: Failed to create Agency.",
    };
  }

  revalidatePath("/dashboard/agencies");
  redirect("/dashboard/agencies/");
}
