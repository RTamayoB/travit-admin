'use server';

import {unstable_noStore as noStore} from "next/cache";
import {createClient} from '@/utils/supabase/server';
import { Stop } from "@/app/lib/definitions";

const supabase = createClient();
const ITEMS_PER_PAGE = 6;

export async function fetchStops(
    query: string,
    currentPage: number,
) {
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
        console.log('Stops', data)
        return data as Stop[]
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch agencies')
    }
}

export async function fetchStopPages(query: string) {
    noStore();

    try {
        let queryBuilder = supabase
        .from("stops")
        .select('*', { count: 'exact'})

        if (query) {
            queryBuilder
            .or(`name.ilike.%${query}%, name.ilike.%${query}%`)
        }
        const { count } = await queryBuilder
        console.log('Pure count', count)
        return Math.ceil(Number(count || 1) / ITEMS_PER_PAGE)
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch total number of stops.')
    }
}