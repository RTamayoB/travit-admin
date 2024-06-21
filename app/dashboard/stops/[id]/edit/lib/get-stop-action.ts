'use server';

import { Stop } from '@/app/lib/definitions';
import {createClient} from '@/utils/supabase/server';

export async function fetchStopById(id: string) {

    const supabase = createClient();
    
    try {
        let queryBuilder = supabase
        .from("stops")
        .select("id, created_at, name, description, location")
        .eq('id', id)
        .single()

        const { data } = await queryBuilder
        return data as Stop
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch agencies')
    }
}
