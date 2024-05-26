'use client';
import { createClient } from "@/utils/supabase/client";
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
   const supabase = createClient();

  useEffect(() => {
    const retrieveUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
    retrieveUser();

  }, [router,supabase]);

  return (
    <div>
    </div>
    );
};

export default Home;