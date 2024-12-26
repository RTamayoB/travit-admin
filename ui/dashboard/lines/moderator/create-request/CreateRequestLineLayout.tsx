"use client";

import Header from "@/ui/sections/header";
import LineForm from "@/ui/sections/forms/lineform";
import { Agency, LineState, Stop } from "@/app/lib/definitions";
import { useActionState } from "react";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { redirect } from "next/navigation";
import { createLineRequest } from "@/app/dashboard/lines/(moderator)/create-request/data/create-line-request";

interface CreateLineLayoutProps {
  agencies: Agency[];
  stops: Stop[];
}

function CreateRequestLineLayout({
  agencies,
  stops,
}: CreateLineLayoutProps) {
  const { role } = useUserContext();
  
  if(role != "moderator") {
    redirect("/dashboard/lines")
  }
  const initialState: LineState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createLineRequest, initialState);

  return (
    <div>
      <Header
        breadcrumbList={[
          {
            id: 1,
            label: "Lineas",
            href: "/dashboard/lines",
            active: false,
          },
          {
            id: 2,
            label: "Nueva Linea",
            href: "/dashboard/lines/create",
            active: true,
          },
        ]}
      />
      <LineForm
        stops={stops}
        agencies={agencies}
        onSubmit={formAction}
        state={state}
        submitButtonText={"Solicitar nueva Linea"}
      />
    </div>
  );
}

export default CreateRequestLineLayout;
