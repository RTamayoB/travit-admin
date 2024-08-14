'use server';

import { createClient } from "../../../../../../utils/supabase/server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function deleteLine(id: String) {
    const supabase = createClient();

    try {
        
        await supabase
        .from("route_points")
        .delete()
        .eq('line_id', id)
        
        await supabase
        .from('lines')
        .delete()
        .eq('id', id)
        
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to delete line')
    }

    revalidatePath('/dashboard/lines')
    redirect('/dashboard/lines/')
}
