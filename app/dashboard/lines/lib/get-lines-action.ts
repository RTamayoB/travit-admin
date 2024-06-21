'use server';

import { ITEMS_PER_PAGE } from '@/app/lib/utils';
import { createClient } from '@/utils/supabase/server';

export async function fetchFilteredLines(
    query: string,
    currentPage: number,
) {
    
    const supabase = createClient();
    
    const from = (currentPage - 1) * ITEMS_PER_PAGE
    const to = from + ITEMS_PER_PAGE
    try {
        let queryBuilder = supabase
        .from('lines')
        .select('id, created_at, updated_at, line_number, legacy_line_number')
        .range(from, to)
        .limit(ITEMS_PER_PAGE)
        if (query) {
            queryBuilder
            .or(`line_number.ilike.%${query}%, legacy_line_number.ilike.%${query}%`)
        }
        const { data } = await queryBuilder
        console.log('lines', data)
        return data
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch lines for table')
    }
}