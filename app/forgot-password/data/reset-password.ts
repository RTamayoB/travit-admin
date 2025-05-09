'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function sendPasswordResetEmail(formData: FormData) {
    const supabase = await createClient();
    
    const email = formData.get('recoverEmail') as string
    
    const { error } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: '/update-password'}
    )
    
    if (error) {
        redirect('/error?message='+error)
    }
    
    redirect('/login')
}
