"use client";

import Header from "@/ui/sections/header";
import LineForm from "@/ui/sections/forms/lineform";
import { Agency, LineState, Stop } from "@/app/lib/definitions";
import { useActionState } from "react";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { createLine } from "@/app/dashboard/lines/(admin)/create/data/create-line";
import { redirect } from "next/navigation";

interface CreateLineLayoutProps {
  agencies: Agency[];
  stops: Stop[];
}

function CreateLineLayout({
  agencies,
  stops,
}: CreateLineLayoutProps) {
  const { role } = useUserContext();

  if (role != "admin") {
    redirect("/dashboard/lines");
  }
  const initialState: LineState = { message: "", errors: {} };
  const [state, formAction] = useActionState(createLine, initialState);

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
        submitButtonText={"Crear Linea"}
      />
    </div>
  );
}

export default CreateLineLayout;
