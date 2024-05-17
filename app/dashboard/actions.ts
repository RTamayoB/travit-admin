'use client';

import {unstable_noStore as noStore} from "next/cache";
import {createClient} from '@/utils/supabase/client';
import { UserInfo } from "@/app/lib/definitions";

const supabase = createClient();

export async function fetchUserInfo(): Promise<UserInfo> {
    noStore();
    
    try {

        const { data: { user }, } = await supabase.auth.getUser()
        
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('id, full_name, username')
            .eq('id', user?.id)
            .single();
        
        const { data: adminData, error: adminError } = await supabase
            .from('admins')
            .select('role')
            .eq('id', user?.id)
            .single();
        
        console.log('Profile', profileData)
        
        if (profileError != null) {
            console.error('Error fetching profile:', profileError);
        }
        
        const userInfo: UserInfo = {
            id: profileData?.id,
            full_name: profileData?.full_name,
            username: profileData?.username,
            role: adminData?.role
        }
        
        return userInfo
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch agencies')
    }
}