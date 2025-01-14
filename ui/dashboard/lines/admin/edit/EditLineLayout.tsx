"use client";

import Header from "@/ui/sections/header";
import LineForm from "@/ui/sections/forms/lineform";
import { Agency, Line, LineState, Stop } from "@/app/lib/definitions";
import { useActionState } from "react";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { LinkButton } from "@/ui/components";
import { redirect } from "next/navigation";
import { editLine } from "@/app/dashboard/lines/(admin)/[id]/edit/data/edit-line";

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
  const { role } = useUserContext();

  if (role != "admin") {
    redirect("/dashboard/lines");
  }

  const initialState: LineState = { message: null, errors: {} };
  const editCurrentLine = editLine.bind(null, line.id.toString());
  const [state, formAction] = useActionState(editCurrentLine, initialState);

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
            label: "Editar Linea",
            active: true,
          },
        ]}
        actions={
          <>
            {role == "admin" && (
              <LinkButton
                href={`/dashboard/lines/${line.id}/history`}
                label="Ver historial"
              />
            )}
          </>
        }
      />
      {role
        ? (
          <LineForm
            stops={stops}
            agencies={agencies}
            line={line}
            onSubmit={formAction}
            state={state}
            submitButtonText={"Editar Linea"}
          />
        )
        : <p>Loading...</p>}
    </div>
  );
}

export default EditLineLayout;
