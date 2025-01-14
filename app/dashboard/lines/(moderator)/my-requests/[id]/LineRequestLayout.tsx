"use client";

import Header from "@/ui/sections/header";
import { Agency, Line, LineState, Stop } from "@/app/lib/definitions";
import { useActionState } from "react";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { redirect } from "next/navigation";
import { editLineRequest } from "./data/actions";
import LineForm from "@/ui/sections/forms/lineform";

interface LineRequestLayoutProps {
  agencies: Agency[];
  stops: Stop[];
  requestId: string;
  line: Line;
}

function LineRequestLayout({
  agencies,
  stops,
  requestId,
  line,
}: LineRequestLayoutProps) {
  const { role } = useUserContext();

  if (role != "moderator") {
    redirect("/dashboard/lines");
  }

  const initialState: LineState = { message: null, errors: {} };
  const editCurrentLineRequest = editLineRequest.bind(
    null,
    line.id.toString(),
    requestId,
  );
  const [state, formAction] = useActionState(
    editCurrentLineRequest,
    initialState,
  );

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
            label: "Mis Solicitudes",
            href: "/dashboard/lines/my-requests",
            active: false,
          },
          {
            id: 3,
            label: "Editar Solicitud",
            href: `/dashboard/lines/my-requests/${line.id}`,
            active: true,
          },
        ]}
      />
      {role
        ? (
          <LineForm
            stops={stops}
            agencies={agencies}
            line={line}
            onSubmit={formAction}
            state={state}
            submitButtonText={"Solicitar edicion a Linea"}
          />
        )
        : <p>Loading...</p>}
    </div>
  );
}

export default LineRequestLayout;
