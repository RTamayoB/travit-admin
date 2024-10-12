'use server';

import { createClient } from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function deleteAgency(id: String) {
    const supabase = createClient();

    try {

        await supabase
        .from('agencies')
        .delete()
        .eq('id', id)

    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to delete agency')
    }

    revalidatePath('/dashboard/agencies')
    redirect('/dashboard/agencies/')
}
