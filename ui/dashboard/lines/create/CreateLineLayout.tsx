'use client';

import Header from "@/ui/sections/header";
import LineForm from "@/ui/sections/forms/lineform";
import { Agency, LineState, Stop } from "@/app/lib/definitions";
import { useActionState } from "react";
import { createLine } from "@/app/dashboard/lines/create/data/create-line";

interface CreateLineLayoutProps {
  agencies: Agency[];
  stops: Stop[];
}

function CreateLineLayout({
  agencies,
  stops,
}: CreateLineLayoutProps) {
  const initialState: LineState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createLine, initialState)

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
            label: "Crear Linea",
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
        submitButtonText="Crear Linea"
      />
    </div>
  );
}

export default CreateLineLayout;
