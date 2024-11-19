'use server';

import {createClient} from '@/utils/supabase/server';
import { Stop, Position } from "@/app/lib/definitions";
import { ITEMS_PER_PAGE } from '@/app/lib/utils';

export async function getStopsByRange(
    query: string,
    currentPage: number,
) {
    const supabase = await createClient();
    const from = (currentPage - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE
    try {
        let queryBuilder = supabase
        .from("stops")
        .select("id, name, description, position")
        .range(from, to)
        .order('id', { ascending: true })
        .limit(ITEMS_PER_PAGE)

        if (query) {
            queryBuilder
            .or(`name.ilike.%${query}%, name.ilike.%${query}%`)
        }

        const { data } = await queryBuilder

        if (!data) {
            return [];
        }

        const stops: Stop[] = data.map((stop: any) => {
            const position: Position = {
                lat: stop.position.coordinates[0],
                lng: stop.position.coordinates[1]
            }

            return {
                ...stop,
                position
            }
        })
        return stops
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch agencies')
    }
}
