'use client';

import { useUser } from "@/app/lib/UserContextProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {

  const userContext = useUser();

  useEffect(() => {
    if(userContext.role != "admin") {
      redirect("/dashboard/lines")
    }
  }, [userContext]);

  return (
    <p>Line hsitory...</p>
  );
}
