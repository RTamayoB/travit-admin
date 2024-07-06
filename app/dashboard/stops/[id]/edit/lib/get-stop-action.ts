'use server';

import { Position } from '@/app/dashboard/lines/test-page/lib/new-definitions';
import { Stop } from '@/app/lib/definitions';
import {createClient} from '@/utils/supabase/server';

export async function fetchStopById(id: string) {

    const supabase = createClient();
    
    try {
        let queryBuilder = supabase
        .from("stops")
        .select("id, created_at, name, description, position")
        .eq('id', id)
        .single()

        const { data } = await queryBuilder

        const position: Position = data.position
            ? {
                lat: data.position.coordinates[0],
                lng: data.position.coordinates[1]
            }
            : { lat: null, lng: null };

        const stop: Stop = {
            id: data.id,
            created_at: data.created_at,
            name: data.name,
            description: data.description,
            position
        };

        return stop;
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch stops')
    }
}
