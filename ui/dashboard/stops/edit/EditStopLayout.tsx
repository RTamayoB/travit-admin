"use client";

import Header from "@/ui/sections/header";
import { Stop, StopState } from "@/app/lib/definitions";
import { StopForm } from "@/ui/sections/forms";
import { editStopById } from "@/app/dashboard/stops/[id]/edit/data/edit-stop";
import { useActionState } from "react";

interface EditStopLayoutProps {
  stop: Stop;
}

function EditStopLayout({
  stop,
}: EditStopLayoutProps) {
  const initialState: StopState = { message: null, errors: {} };
  const editStop = editStopById.bind(null, stop.id.toString());
  const [state, formAction] = useActionState(editStop, initialState);

  return (
    <div>
      <Header
        breadcrumbList={[
          {
            label: "Paradas",
            href: "/dashboard/stops",
            active: false,
          },
          {
            label: "Editar Parada",
            href: `/dashboard/stops/${stop.id}/edit`,
            active: true,
          },
        ]}
      />
      <StopForm
        stop={stop}
        onSubmit={formAction}
        state={state}
        submitButtonText="Editar Parada"
      />
    </div>
  );
}

export default EditStopLayout;
