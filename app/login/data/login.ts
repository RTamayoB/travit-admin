'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address'}),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long'})
})

export async function login(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };
    
    const validation = loginSchema.safeParse(data);
    
    if (!validation.success) {
        const formErrors = validation.error.errors.map(err => err.message).join(', ')
        return redirect(`/login?message=${encodeURIComponent(formErrors)}`)
    }

    const { error } = await supabase.auth.signInWithPassword(data);
    
    if (error) {
        return redirect("/login?message=Could not authenticate user");
    }

    redirect('/dashboard')
}
