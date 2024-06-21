'use server';

import {createClient} from '@/utils/supabase/server';
import { Stop } from "@/app/lib/definitions";

export async function fetchAllStops() {
    const supabase = createClient();
    
    try {
        let queryBuilder = supabase
        .from("stops")
        .select("id, created_at, name, description, location")
        .order('id', { ascending: true })

        const { data } = await queryBuilder
        return data as Stop[]
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch agencies')
    }
}