'use server';

import {unstable_noStore as noStore, revalidatePath} from "next/cache";
import {createClient} from '@/utils/supabase/server';
import { Stop } from "@/app/lib/definitions";
import {z} from "zod";
import FormData from "react";
import {redirect} from "next/navigation";

const supabase = createClient();
const ITEMS_PER_PAGE = 6;

export async function fetchStops(
    query: string,
    currentPage: number,
) {
    const from = (currentPage - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE
    try {
        let queryBuilder = supabase
        .from("stops")
        .select("id, created_at, name, description, location")
        .range(from, to)
        .order('id', { ascending: true })
        .limit(ITEMS_PER_PAGE)

        if (query) {
            queryBuilder
            .or(`name.ilike.%${query}%, name.ilike.%${query}%`)
        }

        const { data } = await queryBuilder
        return data as Stop[]
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch agencies')
    }
}

export async function fetchStopPages(query: string) {
    noStore();

    try {
        let queryBuilder = supabase
        .from("stops")
        .select('*', { count: 'exact'})

        if (query) {
            queryBuilder
            .or(`name.ilike.%${query}%, name.ilike.%${query}%`)
        }
        const { count } = await queryBuilder
        return Math.ceil(Number(count || 1) / ITEMS_PER_PAGE)
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch total number of stops.')
    }
}

const CreateStopFormSchema = z.object({
    id: z.number(),
    created_at: z.string(),
    name: z.string(),
    description: z.string(),
    lat: z.string(),
    lng: z.string()
});

const CreateLine = CreateStopFormSchema.omit({ id: true, created_at: true });

export async function createStop(formData: FormData) {
    console.log("FormData", formData)
    const { name, description, lat, lng } = CreateLine.parse({
        name: formData.get('name'),
        description: formData.get('description'),
        lat: formData.get('lat'),
        lng: formData.get('lng'),
    });

    try {
        let queryBuilder = await supabase
        .from('stops')
        .insert([
            {
                name: name,
                description: description,
                location: `POINT(${lat} ${lng})`,
            }
        ])
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to insert line')
    }

    revalidatePath('/dashboard/lines')
    redirect('/dashboard/stops/')
}