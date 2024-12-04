'use client';

import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react"

const supabase = createClient();

export const UserContext = createContext<{ user: User | null; role: string | null}>({
  user: null,
  role: null
});

export const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`Supabase auth event: ${event}`);
      if (session) {
        const jwt: { user_role: string } = jwtDecode(session.access_token);
        const userRole = jwt.user_role;
        setRole(userRole);
        console.log(userRole);
      }

    })

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    role
  }
  return <UserContext.Provider value={value} {...props} />
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider.');
  }
  return context;
}
