'use server';

import { ITEMS_PER_PAGE } from '@/app/lib/utils';
import { createClient } from '@/utils/supabase/server';
import {Line, RoutePoint} from '@/app/lib/definitions';

export async function fetchFilteredLines(
    query: string,
    currentPage: number,
) {
    const supabase = createClient()

    const from = (currentPage - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE

    let queryBuilder = supabase
        .from("lines")
        .select(`
            id,
            created_at,
            updated_at,
            line_number,
            legacy_line_number,
            units,
            agency_id,
            transport_type,
            line_type,
            route_points
        `)
        .range(from, to)
        .limit(ITEMS_PER_PAGE)

    if (query) {
        queryBuilder
            .or(`line_number.ilike.%${query}%, legacy_line_number.ilike.%${query}%`)
    }

    const { data } = await queryBuilder

    if (!data) {
        return [];
    }

    const routes: Line[] = data.map((route: any) => {
        return {
            id: route.id,
            created_at: route.created_at,
            updated_at: route.updated_at,
            line_number: route.line_number,
            legacy_line_number: route.legacy_line_number,
            units: route.units,
            agency_id: route.agency_id,
            transport_type: route.transport_type,
            line_type: route.line_type,
            route_points: route.route_points as RoutePoint[]
        }
    })

    return routes;
}