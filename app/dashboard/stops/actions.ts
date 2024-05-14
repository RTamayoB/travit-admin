'use server';

import {unstable_noStore as noStore} from "next/cache";
import {createClient} from '@/utils/supabase/server';
import { Stop } from "@/app/lib/definitions";

const supabase = createClient();

export async function fetchStops(): Promise<Stop[]> {
    noStore();
    
    try {
        let queryBuilder = supabase
        .from("stops")
        .select("id, created_at, name, description, location")
        .order('id', { ascending: true })
        const { data } = await queryBuilder
        console.log('Stops', data)
        return data as Stop[]
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch agencies')
    }
}