"use client";

import Header from "@/ui/sections/header";
import { AgencyState } from "@/app/lib/definitions";
import { AgencyForm } from "@/ui/sections/forms";
import { useActionState } from "react";
import { createAgency } from "@/app/dashboard/agencies/create/data/create-agency";

function CreateAgencyLayout() {
  const initialState: AgencyState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createAgency, initialState);

  return (
    <div>
      <Header
        breadcrumbList={[
          {
            label: "Concesionarias",
            href: "/dashboard/agencies",
            active: false,
          },
          {
            label: "Crear Concesionaria",
            href: "/dashboard/agencies/create",
            active: true,
          },
        ]}
      />
      <AgencyForm
        onSubmit={formAction}
        state={state}
        submitButtonText="Crear Concesionaria"
      />
    </div>
  );
}

export default CreateAgencyLayout;
