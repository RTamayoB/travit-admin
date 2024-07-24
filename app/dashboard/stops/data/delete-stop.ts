'use server';

import { createClient } from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function deleteStop(id: String) {
    const supabase = createClient();

    try {
        await supabase
        .from('stops')
        .delete()
        .eq('id', id)
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to insert line')
    }

    revalidatePath('/dashboard/stops')
    redirect('/dashboard/stops/')
}