import { createClient } from "@/utils/supabase/server";
import {Route} from "@/app/dashboard/lines/test-page/lib/new-definitions";
import {Stop} from "@/app/lib/definitions";

export async function getRouteById(routeId: number): Promise<Route> {
    const supabase = createClient()

    const { data, error } = await supabase
        .from("routes")
        .select(`
            id,
            name,
            created_at,
            updated_at,
            line_number,
            line_legacy_number,
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
                    location
                )
            )
        `)
        .eq('id', routeId)
        .single();

    if (error) {
        throw error
    }

    return data.map((route: any) => ({
        id: route.id,
        name: route.name,
        created_at: route.created_at,
        updated_at: route.updated_at,
        line_number: route.line_number,
        line_legacy_number: route.line_legacy_number,
        units: route.units,
        agency_id: route.agency_id,
        transport_type: route.transport_type,
        line_type: route.line_type,
        points: route.points.map((point: any) => ({
            id: point.id,
            position: point.position,
            isStop: point.isStop,
            order: point.order,
            busStop: point.bus_stops ? {
                id: point.bus_stops.id,
                name: point.bus_stops.name,
                position: {
                    lat: point.bus_stops.position.coordinates[1],
                    lng: point.bus_stops.position.coordinates[0]
                }
            } : null
        }))
    }));
}

async function insertRoute(route: Route): Promise<void> {
    const supabase = createClient()
    
    const {data: routeData, error: routeError } = await supabase
        .from("routes")
        .insert([{ name: route.name }])
        .select('id')
        .single()
    
    if (routeError) {
        throw routeError
    }
    
    const routeId = routeData.id
    
    const routePoints = route.points.map(point => ({
        route_id: routeId,
        position: `SRID=4326;POINT(${point.position.lng} ${point.position.lat})`,
        is_stop: point.isStop,
        stop_id: point.busStop ? point.busStop.id : null,
        order: point.order
    }));
    
    const { error: pointsError } = await supabase
        .from("route_points")
        .insert(routePoints)
    
    if (pointsError) {
        throw pointsError
    }
}

async function getAllBusStops(): Promise<Stop[]> {
    
    const supabase = createClient()
    
    const { data, error } = await supabase
        .from('bus_stops')
        .select('id, name, position');

    if (error) {
        throw error;
    }

    return data.map((row: any) => ({
        id: row.id,
        name: row.name,
        position: {
            lat: row.position.coordinates[1],
            lng: row.position.coordinates[0]
        }
    }));
}