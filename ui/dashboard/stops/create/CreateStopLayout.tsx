"use client";

import Header from "@/ui/sections/header";
import { StopState } from "@/app/lib/definitions";
import { useActionState } from "react";
import { createStop } from "@/app/dashboard/stops/create/data/create-stop";
import StopForm from "@/ui/sections/forms/stopform";

function CreateStopLayout() {
  const initialState: StopState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createStop, initialState);

  return (
    <div>
      <Header
        breadcrumbList={[
          {
            id: 1,
            label: "Paradas",
            href: "/dashboard/stops",
            active: false,
          },
          {
            id: 2,
            label: "Crear Parada",
            href: "/dashboard/stops/create",
            active: true,
          },
        ]}
      />
      <StopForm
        onSubmit={formAction}
        state={state}
        submitButtonText="Crear Parada"
      />
    </div>
  );
}

export default CreateStopLayout;
