'use server';

import {revalidatePath, unstable_noStore as noStore} from "next/cache";
import {redirect} from "next/navigation";
import {z} from 'zod';
import {createClient} from '@/utils/supabase/server';
import {ITEMS_PER_PAGE} from "@/app/lib/utils";
import {Agencies} from "@/app/lib/definitions";

const supabase = createClient();

export async function fetchLinePages(query: string) {
    noStore();
    
    try {
        let queryBuilder = supabase
        .from("lines")
        .select('*', { count: 'exact'})
        
        if (query) {
            queryBuilder
            .or(`line_number.ilike.%${query}%, legacy_line_number.ilike.%${query}%`)
        }
        const { count } = await queryBuilder
        console.log('Pure count', count)
        return Math.ceil(Number(count || 1) / ITEMS_PER_PAGE)
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch total number of lines.')
    }
}

export async function fetchAgencies(): Promise<Agencies[]> {
    noStore();
    
    try {
        let queryBuilder = supabase
        .from("agencies")
        .select("id, created_at, name")
        .order('id', { ascending: true })
        const { data } = await queryBuilder
        console.log('Agencies', data)
        return data as Agencies[]
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch agencies')
    }
}

const FormSchema = z.object({
    id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    line_number: z.string(),
    legacy_line_number: z.string(),
    units: z.coerce.number(),
    agency_id: z.coerce.number({
        invalid_type_error: 'Por favor selecciona una concesionaria.'
    }),
    transport_type: z.enum(['bus', 'train', 'tram', 'rail'], {
        invalid_type_error: 'Por favor selecciona un tipo de trasnporte.'
    }),
    line_type: z.enum(['troncal', 'complementaria', 'alimentadora', 'linea'], {
        invalid_type_error: 'Por favor selecciona un tipo de linea.'
    }),
});


const CreateLine = FormSchema.omit({ id: true, created_at: true, updated_at: true });

export async function createLine(formData: FormData) {
    const { line_number, legacy_line_number, units, agency_id, transport_type, line_type } = CreateLine.parse({
        line_number: formData.get('line_number'),
        legacy_line_number: formData.get('legacy_line_number'),
        units: formData.get('units'),
        agency_id: formData.get('agency_id'),
        transport_type: formData.get('line_color'),
        line_type: formData.get('line_type')
    });
    const date = new Date().toISOString().split('T')[0]
    
    try {
        let queryBuilder = supabase
        .from('lines')
        .insert([
            {
                line_number: line_number,
                legacy_line_number: legacy_line_number,
                units: units,
                agency_id: agency_id,
                transport_type: transport_type,
                line_type: line_type,
            }
        ])
        const result = await queryBuilder
        revalidatePath('/dashboard/lines')
        redirect('/dashboard/lines')
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to insert line')
    }
}