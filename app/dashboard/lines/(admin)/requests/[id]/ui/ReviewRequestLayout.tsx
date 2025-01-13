"use client";

import Header from "@/ui/sections/header";
import { Agency, Line, LineChangeRequest } from "@/app/lib/definitions";
import { useState } from "react";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { redirect } from "next/navigation";
import { Button, TextField, Typography } from "@/ui/components";
import styles from '../../requestslayout.module.scss';
import RequestDetails from "./RequestDetails";
import SimpleLineView from "@/ui/dashboard/lines/simplelineview/SimpleLineView";

interface ReviewRequestLayoutProps {
  agency: Agency;
  request: LineChangeRequest;
  onNotesAdded: (requestId: number, notes: string) => Promise<{message: string}>;
  onRequestApproved: (request: LineChangeRequest) => Promise<{message: string}>;
  onRequestRejected: (request: LineChangeRequest) => Promise<{message: string}>;
}

function ReviewRequestLayout({
  agency,
  request,
  onNotesAdded,
  onRequestApproved,
  onRequestRejected
}: ReviewRequestLayoutProps) {
  const { role } = useUserContext();
  const [notes, setNotes] = useState(request.notes);
  const line = JSON.parse(request.data) as Line;

  if (role != "admin") {
    redirect("/dashboard/lines");
  }

  const handleOnNotesAdded = async () => {
    await onNotesAdded(request.id, notes)
  }

  const handleOnRequestApproved = async () => {
    await onRequestApproved(request)
  }

  const handleOnRequestRejected = async () => {
    await onRequestRejected(request)
  }

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
            label: "Solicitudes",
            href: "/dashboard/lines/requests",
            active: false,
          },
          {
            id: 3,
            label: "Revision de Solicitud",
            href: `/dashboard/lines/requests/${line.id}`,
            active: true,
          }
        ]}
      />
      <div className={styles.content}>
        <Typography variant="h6" className={styles.subtitle}>Detalles de Solicitud</Typography>
        <RequestDetails request={request}/>
        <Typography variant="h6" className={styles.subtitle}>Detalles de Linea</Typography>
        <SimpleLineView
          line={JSON.parse(request.data) as Line}
          agency={agency.name}
        />
        <TextField
          id="notes"
          name="notes"
          label="Notas"
          value={notes}
          onValueChange={(value) => setNotes(value)}
        />
        <div className={styles.buttons}>
          <Button
            label="Enviar comentarios"
            primary={false}
            onClick={handleOnNotesAdded}
          />
          <Button
            label="Aceptar cambios"
            onClick={handleOnRequestApproved}
          />
          <Button
            label="Rechazar cambios"
            onClick={handleOnRequestRejected}
          />
        </div>
      </div>
    </div>
  );
}

export default ReviewRequestLayout;
