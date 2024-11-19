'use client';

import Header from "@/ui/sections/header";
import LineForm from "@/ui/sections/forms/lineform";
import { Agency, Line, LineState, Stop } from "@/app/lib/definitions";
import { editLine } from "@/app/dashboard/lines/[id]/edit/data/edit-line";
import { useActionState } from "react";

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
  const initialState: LineState = { message: null, errors: {} };
  const editCurrentLine = editLine.bind(null, line.id.toString());
  const [state, formAction] = useActionState(editCurrentLine, initialState)

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
      />
      <LineForm
        stops={stops}
        agencies={agencies}
        line={line}
        onSubmit={formAction}
        state={state}
        submitButtonText="Editar Linea"
      />
    </div>
  );
}

export default EditLineLayout;
