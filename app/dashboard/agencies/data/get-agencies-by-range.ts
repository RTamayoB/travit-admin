'use server';

import { ITEMS_PER_PAGE } from '@/app/lib/utils';
import { createClient } from '@/utils/supabase/server';
import { Agency } from '@/app/lib/definitions';

export async function getAgenciesByRange(
    query: string,
    currentPage: number,
) {
    const supabase = createClient()

    const from = (currentPage - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE

    let queryBuilder = supabase
        .from("agencies")
        .select(`
            id,
            name
        `)
        .range(from, to)
        .limit(ITEMS_PER_PAGE)

    if (query) {
        queryBuilder
            .or(`name.ilike.%${query}%`)
    }

    const { data } = await queryBuilder

    if (!data) {
        return [];
    }

    const agencies: Agency[] = data.map((agency: any) => {
        return {
            id: agency.id,
            name: agency.name
        }
    })

    return agencies;
}