"use client";

import Header from "@/ui/sections/header";
import LineForm from "@/ui/sections/forms/lineform";
import { Agency, LineState, Stop } from "@/app/lib/definitions";
import { useActionState, useEffect, useState } from "react";
import { createLine } from "@/app/dashboard/lines/create/data/create-line";
import { useUser } from "@/app/lib/UserContextProvider";
import { createLineRequest } from "@/app/dashboard/lines/create/data/create-line-request";
import { LinkButton } from "@/ui/components";

interface CreateLineLayoutProps {
  agencies: Agency[];
  stops: Stop[];
}

function CreateLineLayout({
  agencies,
  stops,
}: CreateLineLayoutProps) {
  const userContext = useUser();
  const initialState: LineState = { message: null, errors: {} };
  const [stateAdmin, formActionAdmin] = useActionState(createLine, initialState);
  const [stateMod, formActionMod] = useActionState(createLineRequest, initialState);
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    setRole(userContext.role)
  }, [userContext])

  const state = role == "admin" ? stateAdmin : stateMod;
  const formAction = role == " admin" ? formActionAdmin : formActionMod;
  const callToAction = role == "admin" ? "Crear Linea" : "Solicitar Linea"

  return (
    <div>
      <Header
        breadcrumbList={[
          {
            label: "Lineas",
            href: "/dashboard/lines",
            active: false,
          },
          {
            label: "Nueva Linea",
            href: "/dashboard/lines/create",
            active: true,
          },
        ]}
      />
      {role ? ( // Ensure role is set before rendering the form
        <LineForm
          stops={stops}
          agencies={agencies}
          onSubmit={formAction}
          state={state}
          submitButtonText={callToAction}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CreateLineLayout;
