'use server';

import {createClient} from '@/utils/supabase/server';
import { Stop, Position } from "@/app/lib/definitions";

export async function getAllStops() {
    const supabase = createClient();
    
    try {
        let queryBuilder = supabase
        .from("stops")
        .select("id, created_at, name, description, position")
        .order('id', { ascending: true })

        const { data } = await queryBuilder;

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
