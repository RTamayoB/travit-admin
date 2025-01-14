"use client";

import Header from "@/ui/sections/header";
import LineForm from "@/ui/sections/forms/lineform";
import { Agency, Line, LineState, Stop } from "@/app/lib/definitions";
import { useActionState } from "react";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { redirect } from "next/navigation";
import { createEditLineRequest } from "@/app/dashboard/lines/(moderator)/[id]/edit-request/data/create-edit-line-request";

interface EditRequestLineLayoutProps {
  agencies: Agency[];
  stops: Stop[];
  line: Line;
}

function EditLineRequestLayout({
  agencies,
  stops,
  line,
}: EditRequestLineLayoutProps) {
  const { role } = useUserContext();

  if (role != "moderator") {
    redirect("/dashboard/lines");
  }

  const initialState: LineState = { message: null, errors: {} };
  const createCurrentEditLineRequest = createEditLineRequest.bind(
    null,
    line.id.toString(),
  );
  const [state, formAction] = useActionState(
    createCurrentEditLineRequest,
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
            label: "Solicitar Edicion a Linea",
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

export default EditLineRequestLayout;
