"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { StopSchema } from "@/app/lib/schemas";
import { StopState } from "@/app/lib/definitions";

const CreateStop = StopSchema.omit({ id: true, created_at: true });

export async function editStopById(
  id: string,
  prevState: StopState,
  formData: FormData,
) {
  return (async () => {
    const supabase = await createClient();

    const parsedData = CreateStop.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      lat: formData.get("lat"),
      lng: formData.get("lng"),
    });

    if (!parsedData.success) {
      return {
        errors: parsedData.error.flatten().fieldErrors,
        message: "Campos faltantes. No se pudo actualizar la Parada",
      };
    }

    try {
      await supabase
        .from("stops")
        .update([
          {
            name: parsedData.data.name,
            description: parsedData.data.description,
            position: `POINT(${parsedData.data.lat} ${parsedData.data.lng})`,
          },
        ])
        .eq("id", id);
    } catch (error) {
      return { message: "Error al actualizar Parada" };
    }

    revalidatePath("/dashboard/stops");

    return { message: "" };
  })();
}

export async function cancelStopEdit() {
  revalidatePath("/dashboard/stops");
}
