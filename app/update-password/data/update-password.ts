'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function updatePassword(formData: FormData) {
    const supabase = await createClient();
    
    const formInfo = {
        password: formData.get('password') as string,
        code: formData.get('code') as string,
    }
    
    if (formInfo.code) {
        const { error } = await supabase.auth.exchangeCodeForSession(formInfo.code)
    }
    
    const { error } = await supabase.auth.updateUser(
        {
            password: formInfo.password
        }
    )
    
    if (error) {
        redirect('/error')
    }
    
    redirect('/login')
}
