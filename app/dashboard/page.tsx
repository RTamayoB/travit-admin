import { createClient } from '@/utils/supabase/server';
import Map from "./components/Map"

export default async function Page() {
    const supabase = createClient();
    const { data: lines } = await supabase.from("lines").select();

    return (
        <div>
            <Map position={[20.6597, 256.6500]} zoom={23}/>
        </div>
    );
}