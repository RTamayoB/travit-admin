'use server';

import { createClient } from '@/utils/supabase/server';
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {RoutePoint} from "@/app/dashboard/lines/test-page/lib/new-definitions";

const PositionSchema = z.object({
    lat: z.number(),
    lng: z.number(),
});

const StopSchema = z.object({
    id: z.number(),
    created_at: z.string().optional(),
    name: z.string(),
    description: z.string().nullable(),
    position: PositionSchema,
}).nullable();

const RoutePointSchema = z.object({
    id: z.number().optional(),
    position: PositionSchema,
    isStop: z.boolean(),
    order: z.number(),
    busStop: StopSchema,
});

const RouteSchema = z.object({
    id: z.number().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    line_number: z.string(),
    legacy_line_number: z.string(),
    units: z.coerce.number(),
    agency_id: z.coerce.number(),
    transport_type: z.string(),
    line_type: z.string(),
});

const CreateRoute = RouteSchema.omit({ id: true, created_at: true, updated_at: true });

export async function saveRoute(id: string, formData: FormData) {
    const supabase = createClient();
    
    console.log("ID", id)
    console.log("FORMDATA", formData)

    // Parse and validate form data
    const parsedData = CreateRoute.parse({
        line_number: formData.get('line_number'),
        legacy_line_number: formData.get('legacy_line_number'),
        units: formData.get('units'),
        agency_id: formData.get('agency_id'),
        transport_type: formData.get('transport_type'),
        line_type: formData.get('line_type')
    });
    
    const routePointsString = formData.get('routePoints')?.toString();
    let routePoints: RoutePoint[] = [];
    if (routePointsString != null) {
        routePoints = JSON.parse(routePointsString);
    }
    
    console.log("ROUTEPOINTS", routePoints)

    try {
        // Insert route
        await supabase
            .from('routes')
            .update([{
                line_number: parsedData.line_number,
                legacy_line_number: parsedData.legacy_line_number,
                units: parsedData.units,
                agency_id: parsedData.agency_id,
                transport_type: parsedData.transport_type,
                line_type: parsedData.line_type,
            }])
            .eq('id', id)
        
        await supabase
            .from('route_points')
            .delete()
            .eq('line_id', id);

        for (const point of routePoints) {
            
            console.log("CURRENTPOINT", point)

            await supabase
                .from('route_points')
                .insert([{
                    line_id: id,
                    position: `POINT(${point.position.lat} ${point.position.lng})`,
                    is_stop: point.isStop,
                    order: point.order,
                    stop_id: point.busStop?.id,
                }]);
        }

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to save route');
    }

    revalidatePath('/dashboard/lines');
    redirect('/dashboard/lines/');
}