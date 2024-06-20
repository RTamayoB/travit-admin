'use server';

import {createClient} from '@/utils/supabase/server';
import { Stop } from "@/app/lib/definitions";
import { ITEMS_PER_PAGE } from '@/app/lib/utils';

export async function fetchStops(
    query: string,
    currentPage: number,
) {
    const supabase = createClient();
    const from = (currentPage - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE
    try {
        let queryBuilder = supabase
        .from("stops")
        .select("id, created_at, name, description, location")
        .range(from, to)
        .order('id', { ascending: true })
        .limit(ITEMS_PER_PAGE)

        if (query) {
            queryBuilder
            .or(`name.ilike.%${query}%, name.ilike.%${query}%`)
        }

        const { data } = await queryBuilder
        return data as Stop[]
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch agencies')
    }
}
