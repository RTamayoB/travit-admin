'use server';

import {unstable_noStore as noStore} from "next/cache";
import {createClient} from "@/utils/supabase/server";
import { ITEMS_PER_PAGE } from "@/app/lib/utils";

export async function fetchLinePages(query: string) {
    
    const supabase = createClient();
    
    noStore();
    
    try {
        let queryBuilder = supabase
        .from("lines")
        .select('*', { count: 'exact'})
        
        if (query) {
            queryBuilder
            .or(`line_number.ilike.%${query}%, legacy_line_number.ilike.%${query}%`)
        }
        const { count } = await queryBuilder
        console.log('Pure count', count)
        return Math.ceil(Number(count || 1) / ITEMS_PER_PAGE)
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch total number of lines.')
    }
}