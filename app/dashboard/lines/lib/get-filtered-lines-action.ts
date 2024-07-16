'use server';

import { ITEMS_PER_PAGE } from '@/app/lib/utils';
import { createClient } from '@/utils/supabase/server';
import {Position, Route } from '../test-page/lib/new-definitions';
import { Stop } from '@/app/lib/definitions';

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
            route_points(
                id,
                position,
                is_stop,
                order,
                stops(
                    id,
                    created_at,
                    name,
                    description,
                    position
                )
            )
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

    const routes: Route[] = data.map((route: any) => {
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
            points: route.route_points.map((point: any) => {
                const busStop: Stop | null = point.stops ? {
                    id: point.stops.id,
                    created_at: point.stops.created_at,
                    name: point.stops.name,
                    description: point.stops.description,
                    position: {
                        lat: point.stops.position.coordinates[0],
                        lng: point.stops.position.coordinates[1]
                    }
                } : null;

                const position: Position = {
                    lat: point.position.coordinates[0],
                    lng: point.position.coordinates[1]
                };

                return {
                    id: point.id,
                    position,
                    isStop: point.is_stop,
                    order: point.order,
                    busStop
                };
            })
        }
    })

    return routes;
}