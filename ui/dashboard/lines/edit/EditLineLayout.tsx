"use client";

import Header from "@/ui/sections/header";
import LineForm from "@/ui/sections/forms/lineform";
import { Agency, Line, LineState, Stop } from "@/app/lib/definitions";
import { editLine } from "@/app/dashboard/lines/[id]/edit/data/edit-line";
import { useActionState, useEffect, useState } from "react";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { LinkButton } from "@/ui/components";
import { editLineRequest } from "@/app/dashboard/lines/[id]/edit/data/edit-line-request";

interface EditLineLayoutProps {
  agencies: Agency[];
  stops: Stop[];
  line: Line;
}

function EditLineLayout({
  agencies,
  stops,
  line,
}: EditLineLayoutProps) {
  const userContext = useUserContext();
  const initialState: LineState = { message: null, errors: {} };
  const editCurrentLine = editLine.bind(null, line.id.toString());
  const editCurrentLineRequest = editLineRequest.bind(null, line.id.toString());
  const [stateAdmin, formActionAdmin] = useActionState(editCurrentLine, initialState);
  const [stateMod, formActionMod] = useActionState(editCurrentLineRequest, initialState)
  const [role, setRole] = useState<string | null>(null)

  useEffect(() => {
    setRole(userContext.role)
  }, [userContext])

  const state = role == "admin" ? stateAdmin : stateMod;
  const formAction = role == " admin" ? formActionAdmin : formActionMod;
   const callToAction = role == "admin" ? "Editar Linea" : "Solicitar Edicion a Linea"

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
            label: "Editar Linea",
            href: `/dashboard/lines/${line.id}/edit`,
            active: true,
          },
        ]}
        actions={
          <>{role == "admin" && (<LinkButton href={`/dashboard/lines/${line.id}/edit/history`} label="Ver historial" />)}</>
        }
      />
      {role ? (
        <LineForm
          stops={stops}
          agencies={agencies}
          line={line}
          onSubmit={formAction}
          state={state}
          submitButtonText={callToAction}
        />
      ): (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default EditLineLayout;
