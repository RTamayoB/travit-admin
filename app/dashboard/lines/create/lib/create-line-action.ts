'use server';

import {revalidatePath} from "next/cache";
import { redirect } from "next/navigation";
import {z} from 'zod';
import {createClient} from '@/utils/supabase/server';

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
    
    const supabase = createClient();
    
    console.log('FormData', formData)
    const { line_number, legacy_line_number, units, agency_id, transport_type, line_type } = CreateLine.parse({
        line_number: formData.get('line_number'),
        legacy_line_number: formData.get('legacy_line_number'),
        units: formData.get('units'),
        agency_id: formData.get('agency_id'),
        transport_type: formData.get('transport_type'),
        line_type: formData.get('line_type')
    });
    const date = new Date().toISOString().split('T')[0]
    
    try {
        let queryBuilder = supabase
        .from('lines')
        .insert([
            {
                created_at: date,
                updated_at: date,
                line_number: line_number,
                legacy_line_number: legacy_line_number,
                units: units,
                agency_id: agency_id,
                transport_type: transport_type,
                line_type: line_type,
            }
        ])
        const result = await queryBuilder
        console.log('Result', result)
        if(result.error == null) {
            revalidatePath('/dashboard/lines')
            redirect('/dashboard/lines/')
        }
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to insert line')
    }
}