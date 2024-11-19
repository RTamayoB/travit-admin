'use server'

import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { z } from 'zod';

const signUpSchema = z.object({
    email: z.string().email({ message: 'Invalid email address'}),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long'})
})

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const origin = (await headers()).get("origin");

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        }
    }
    
    const validation = signUpSchema.safeParse(data);
    
    if (!validation.success) {
        const formErrors = validation.error.errors.map(err => err.message).join(', ')
        return redirect(`/signup?message=${encodeURIComponent(formErrors)}`)
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        return redirect("/signup?message=Could not authenticate user");
    }
    
    redirect('/signup/success')
}
