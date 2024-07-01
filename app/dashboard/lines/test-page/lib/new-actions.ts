import { createClient } from "@/utils/supabase/server";

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

async function getAllBusStops(): Promise<BusStop[]> {
    
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