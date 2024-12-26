"use client";

import Header from "@/ui/sections/header";
import { Agency, Line, LineState, Stop } from "@/app/lib/definitions";
import { useActionState } from "react";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { editLineRequest } from "@/app/dashboard/lines/(moderator)/[id]/edit-request/data/edit-line-request";
import { redirect } from "next/navigation";
import ReviewLineForm from "./ReviewLineForm";

interface LineRequestLayoutProps {
  agencies: Agency[];
  stops: Stop[];
  line: Line;
}

function ReviewRequestLayout({
  agencies,
  stops,
  line
}: LineRequestLayoutProps) {
  const { role } = useUserContext();

  if(role != "admin") {
    redirect("/dashboard/lines")
  }

  const initialState: LineState = { message: null, errors: {} };
  const editCurrentLineRequest = editLineRequest.bind(null, line.id.toString());
  const [state, formAction] = useActionState(editCurrentLineRequest, initialState)

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
      {role ? (
        <ReviewLineForm
          stops={stops}
          agencies={agencies}
          line={line}
          onSubmit={formAction}
          onRejected={() => {}}
          state={state}
          submitButtonText={"Solicitar edicion a Linea"}
        />
      ): (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ReviewRequestLayout;
