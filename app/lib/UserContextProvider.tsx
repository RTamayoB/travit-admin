'use client';

import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react"

const supabase = createClient();

interface UserContextProps {
  userLoaded: boolean,
  user: User | null,
  role: string | null
  refreshUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextProps>({
  userLoaded: false,
  user: null,
  role: null,
  refreshUser: async () => {}
});

export const UserContextProvider = (props: any) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const refreshUser = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching session:", error);
      return;
    }

    if (session) {
      const jwt: { user_role: string } = jwtDecode(session.access_token);
      setRole(jwt.user_role);
      setUser(session.user);
      setUserLoaded(true);
    } else {
      setRole(null);
      setUser(null);
      setUserLoaded(false);
    }
  };

  useEffect(() => {

    refreshUser();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const jwt: { user_role: string } = jwtDecode(session.access_token);
        const userRole = jwt.user_role;
        setRole(userRole);
        setUserLoaded(!!userRole)
      }
    })

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const value = {
    userLoaded,
    user,
    role,
    refreshUser
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
