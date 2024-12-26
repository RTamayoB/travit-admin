"use client";

import Header from "@/ui/sections/header";
import { Agency, AgencyState } from "@/app/lib/definitions";
import { AgencyForm } from "@/ui/sections/forms";
import { editAgencyById } from "@/app/dashboard/agencies/[id]/edit/data/edit-agency";
import { useActionState } from "react";

interface EditAgencyLayoutProps {
  agency: Agency;
}

function EditAgencyLayout({
  agency,
}: EditAgencyLayoutProps) {
  const initialState: AgencyState = { message: null, errors: {} };
  const editAgency = editAgencyById.bind(null, agency.id.toString());
  const [state, formAction] = useActionState(editAgency, initialState);

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
            label: "Editar Concesionaria",
            href: `/dashboard/agencies/${agency.id}/edit`,
            active: true,
          },
        ]}
      />
      <AgencyForm
        agency={agency}
        onSubmit={formAction}
        state={state}
        submitButtonText="Editar Concesionaria"
      />
    </div>
  );
}

export default EditAgencyLayout;
