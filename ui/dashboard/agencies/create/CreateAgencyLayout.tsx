"use client";

import Header from "@/ui/sections/header";
import { AgencyState } from "@/app/lib/definitions";
import { useActionState } from "react";
import { createAgency } from "@/app/dashboard/agencies/create/data/create-agency";
import AgencyForm from "@/ui/sections/forms/agencyform";

function CreateAgencyLayout() {
  const initialState: AgencyState = { message: null, errors: {} };
  const [state, formAction] = useActionState(createAgency, initialState);

  return (
    <div>
      <Header
        breadcrumbList={[
          {
            id: 1,
            label: "Concesionarias",
            href: "/dashboard/agencies",
            active: false,
          },
          {
            id: 2,
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
