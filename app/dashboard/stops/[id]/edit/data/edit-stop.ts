'use server';

import {revalidatePath} from "next/cache";
import {createClient} from '@/utils/supabase/server';
import {z} from "zod";
import {redirect} from "next/navigation";

const EditStopFormSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    lat: z.string(),
    lng: z.string()
});

const CreateLine = EditStopFormSchema.omit({ id: true, created_at: true });


export async function editStopById(id: string, formData: FormData) {
    
    console.log("PARADA", id)
    
    const supabase = createClient();
    
    const { name, description, lat, lng } = CreateLine.parse({
        name: formData.get('name'),
        description: formData.get('description'),
        lat: formData.get('lat'),
        lng: formData.get('lng'),
    });

    try {
        await supabase
        .from('stops')
        .update([
            {
                name: name,
                description: description,
                position: `POINT(${lat} ${lng})`,
            }
        ])
        .eq('id', id)
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to insert line')
    }

    revalidatePath('/dashboard/lines')
    redirect('/dashboard/stops/')
}
