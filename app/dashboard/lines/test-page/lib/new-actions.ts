import { createClient } from "@/utils/supabase/server";
import {Position, Route} from "@/app/dashboard/lines/test-page/lib/new-definitions";
import {Stop} from "@/app/lib/definitions";

export async function getRouteById(routeId: string): Promise<Route> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("routes")
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
        .eq('id', routeId)
        .single();

    if (error) {
        throw error
    }

    const route: Route = {
        id: data.id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        line_number: data.line_number,
        legacy_line_number: data.legacy_line_number,
        units: data.units,
        agency_id: data.agency_id,
        transport_type: data.transport_type,
        line_type: data.line_type,
        points: data.route_points.map((point: any) => {
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
    };

    return route;
}