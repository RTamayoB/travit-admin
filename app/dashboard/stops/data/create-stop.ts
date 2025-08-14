"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { StopSchema } from "@/app/lib/schemas";
import { StopState } from "@/app/lib/definitions";

const CreateLine = StopSchema.omit({ id: true });

export async function createStop(prevState: StopState, formData: FormData) {
  return (async () => {
    console.log("FORM DATA IS " + formData.get("lat"));
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
            position: `SRID=4326;POINT(${parsedData.data.lng} ${parsedData.data.lat})`,
          },
        ]);
    } catch (error) {
      return {
        message: "Error al guardar parada.",
        errors: {},
      };
    }

    revalidatePath("/dashboard/stops");

    return { message: "", errors: {} };
  })();
}
