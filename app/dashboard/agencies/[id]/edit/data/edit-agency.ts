'use server';

import {revalidatePath} from "next/cache";
import {createClient} from '@/utils/supabase/server';
import {z} from "zod";
import {redirect} from "next/navigation";

const EditAgencyFormSchema = z.object({
    id: z.number(),
    name: z.string()
});

const EditAgency = EditAgencyFormSchema.omit({ id: true, created_at: true });


export async function editAgencyById(id: string, formData: FormData) {

    const supabase = createClient();

    const { name } = EditAgency.parse({
        name: formData.get('name')
    });

    try {
        await supabase
        .from('agencies')
        .update([
            {
                name: name
            }
        ])
        .eq('id', id)
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to insert agency')
    }

    revalidatePath('/dashboard/agencies')
    redirect('/dashboard/agencies/')
}
