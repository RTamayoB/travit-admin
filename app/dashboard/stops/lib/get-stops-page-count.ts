'use server';

import {unstable_noStore as noStore} from "next/cache";
import {createClient} from '@/utils/supabase/server';
import { ITEMS_PER_PAGE } from "@/app/lib/utils";

export async function fetchStopPages(query: string) {
    noStore();

    const supabase = createClient();

    try {
        let queryBuilder = supabase
        .from("stops")
        .select('*', { count: 'exact'})

        if (query) {
            queryBuilder
            .or(`name.ilike.%${query}%, name.ilike.%${query}%`)
        }
        const { count } = await queryBuilder
        return Math.ceil(Number(count || 1) / ITEMS_PER_PAGE)
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch total number of stops.')
    }
}
