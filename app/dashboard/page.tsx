import { createClient } from '@/utils/supabase/server';

export default async function Page() {
    const supabase = createClient();
    const { data: lines } = await supabase.from("lines").select();
    return <pre>{JSON.stringify(lines, null, 2)}</pre>
}