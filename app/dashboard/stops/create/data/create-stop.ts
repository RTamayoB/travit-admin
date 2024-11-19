"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { StopSchema } from "@/app/lib/schemas";
import { StopState } from "@/app/lib/definitions";

const CreateLine = StopSchema.omit({ id: true, created_at: true });

export async function createStop(prevState: StopState, formData: FormData) {
  const supabase = await createClient();

  const parsedData = CreateLine.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    lat: formData.get("lat"),
    lng: formData.get("lng"),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Campos faltantes. No se puede crear la Parada.",
    };
  }

  try {
    await supabase
      .from("stops")
      .insert([
        {
          name: parsedData.data.name,
          description: parsedData.data.description,
          position: `POINT(${parsedData.data.lat} ${parsedData.data.lng})`,
        },
      ]);
  } catch (error) {
    return {
      message: "Database Error: Failed to create Stop.",
    };
  }

  revalidatePath("/dashboard/stops");
  redirect("/dashboard/stops/");
}
