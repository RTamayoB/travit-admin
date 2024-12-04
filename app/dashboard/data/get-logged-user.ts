import {unstable_noStore as noStore} from "next/cache";
import {createClient} from '@/utils/supabase/server';
import { UserInfo } from "@/app/lib/definitions";

export async function getLoggedUser(): Promise<UserInfo> {

    const supabase = await createClient();

    noStore();
    
    try {

        const { data: { user }, } = await supabase.auth.getUser()
        
        const { data, error } = await supabase
            .from("profiles")
            .select(`
                id,
                full_name,
                username,
                user_roles ( role )
            `)
            .eq("id", user?.id)
            .single();
        
        if (error) throw error
        
        const userInfo: UserInfo = {
            id: data?.id,
            full_name: data?.full_name,
            username: data?.username,
            role: data?.user_roles?.[0]?.role
        }
        
        return userInfo
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch userInfo')
    }
}
