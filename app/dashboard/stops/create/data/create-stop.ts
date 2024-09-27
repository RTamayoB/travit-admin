'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {z} from "zod";


const CreateStopFormSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    lat: z.string(),
    lng: z.string()
});

const CreateLine = CreateStopFormSchema.omit({ id: true, created_at: true });

export async function createStop(formData: FormData) {

    const supabase = createClient();
    
    console.log("FormData", formData)
    const { name, description, lat, lng } = CreateLine.parse({
        name: formData.get('name'),
        description: formData.get('description'),
        lat: formData.get('lat'),
        lng: formData.get('lng'),
    });

    try {
        await supabase
        .from('stops')
        .insert([
            {
                name: name,
                description: description,
                position: `POINT(${lat} ${lng})`,
            }
        ])
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to insert line')
    }

    revalidatePath('/dashboard/stops')
    redirect('/dashboard/stops/')
}
