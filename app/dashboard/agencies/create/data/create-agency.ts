'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {z} from "zod";


const CreateAgencyFormSchema = z.object({
    id: z.number(),
    name: z.string()
});

const CreateAgency = CreateAgencyFormSchema.omit({ id: true, created_at: true });

export async function createAgency(formData: FormData) {

    const supabase = createClient();

    console.log("FormData", formData)
    const { name } = CreateAgency.parse({
        name: formData.get('name')
    });

    try {
        await supabase
        .from('agencies')
        .insert([
            {
                name: name
            }
        ])
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to insert agency')
    }

    revalidatePath('/dashboard/agencies')
    redirect('/dashboard/agencies/')
}
