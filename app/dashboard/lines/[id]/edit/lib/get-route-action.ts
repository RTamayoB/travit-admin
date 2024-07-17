import {createClient} from "@/utils/supabase/server";
import {Line} from "@/app/lib/definitions";

export async function getRouteById(routeId: string): Promise<Line> {
    const supabase = createClient()

    const { data, error } = await supabase
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
        .eq('id', routeId)
        .single();

    if (error) {
        throw error
    }

    return {
        id: data.id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        line_number: data.line_number,
        legacy_line_number: data.legacy_line_number,
        units: data.units,
        agency_id: data.agency_id,
        transport_type: data.transport_type,
        line_type: data.line_type,
        route_points: data.route_points
    };
}