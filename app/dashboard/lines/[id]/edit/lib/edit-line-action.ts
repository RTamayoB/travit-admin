'use server';

import { createClient } from '@/utils/supabase/server';
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {RoutePoint} from "@/app/dashboard/lines/test-page/lib/new-definitions";

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

    try {
        // Update route
        await supabase
            .from('lines')
            .update([{
                line_number: parsedData.line_number,
                legacy_line_number: parsedData.legacy_line_number,
                units: parsedData.units,
                agency_id: parsedData.agency_id,
                transport_type: parsedData.transport_type,
                line_type: parsedData.line_type,
            }])
            .eq('id', id);
        
        const { data: existingRoutePoints, error } = await supabase
            .from('route_points')
            .select('id, order')
            .eq('line_id', id);

        if (error) {
            throw error;
        }

        const existingRoutePointIds = existingRoutePoints.map((point: { id: number }) => point.id);
        const newRoutePointIds = routePoints.filter(point => point.id !== null).map(point => point.id);

        // Delete route points that no longer exist
        const pointsToDelete = existingRoutePointIds.filter(id => !newRoutePointIds.includes(id));
        if (pointsToDelete.length > 0) {
        await supabase
            .from('route_points')
            .delete()
            .in('id', pointsToDelete);
        }

        // Insert or update route points
        for (const point of routePoints) {
            const pointData = {
                line_id: id,
                position: `POINT(${point.position.lat} ${point.position.lng})`,
                is_stop: point.isStop,
                order: point.order,
                stop_id: point.busStop?.id,
            };

            if (point.id === null) {
                // Insert new point
                await supabase
                    .from('route_points')
                    .insert([pointData]);
            } else {
                // Update existing point
                await supabase
                    .from('route_points')
                    .update(pointData)
                    .eq('id', point.id);
            }
        }

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to save route');
    }

    revalidatePath('/dashboard/lines');
    redirect('/dashboard/lines/');
}