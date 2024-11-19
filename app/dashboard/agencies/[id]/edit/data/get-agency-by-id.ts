'use server';

import {Agency } from '@/app/lib/definitions';
import {createClient} from '@/utils/supabase/server';

export async function getAgencyById(id: string) {

    const supabase = await createClient();

    try {
        let queryBuilder = supabase
        .from("agencies")
        .select("id, name")
        .eq('id', id)
        .single()

        const { data, error } = await queryBuilder

        // Check if data exists and handle the error case
        if (!data || error) {
            throw new Error('Failed to fetch agency data');
        }

        const agency: Agency = {
            id: data.id,
            name: data.name,
        };

        return agency;
    } catch (error) {
        throw new Error('Failed to fetch agencies')
    }
}
