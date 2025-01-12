"use client";

import Header from "@/ui/sections/header";
import { Agency, Line, LineChangeRequest, LineState, Stop } from "@/app/lib/definitions";
import { useState } from "react";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { redirect } from "next/navigation";
import { Button, TextField, Typography } from "@/ui/components";
import styles from '../requestslayout.module.scss';
import LineReviewMap from "@/ui/sections/maps/linereviewmap";

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
        <RequestView
          line={line}
          agency={agency}
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

function LabelValuePair({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className={styles.item}>
      <Typography className={styles.label} variant="bodyLarge">
        {label}
      </Typography>
      <Typography className={styles.value} variant="bodyMedium">
        {value}
      </Typography>
    </div>
  );
}

function RequestDetails({
  request
}: {
  request: LineChangeRequest
}) {

  const date = new Date(request.created_at)

  const details = [
    { label: "Fecha de Solicitud", value: date.toLocaleString() },
    { label: "Creador de la Solicitud", value: request.requester_name },
    { label: "Accion", value: request.action },
    { label: "Estado", value: request.status },
  ];

  return(
    <div>
      {details.map((detail, index) => (
        <LabelValuePair
          key={index}
          label={detail.label}
          value={detail.value}
        />
      ))}
    </div>
  )
}

interface RequestViewProps {
  line: Line;
  agency: Agency
}

function RequestView({
  line,
  agency
}: RequestViewProps) {

  const lineDetails = [
    { label: "Numero de Linea", value: line.line_number },
    { label: "Numero de anterior de Linea", value: line.legacy_line_number },
    { label: "Numero de Unidades", value: line.units.toString() },
    { label: "Tipo de Linea", value: line.line_type },
    { label: "Concesionaria", value: agency.name },
  ];
  return (
    <div>
      {lineDetails.map((detail, index) => (
        <LabelValuePair
          key={index}
          label={detail.label}
          value={detail.value}
        />
      ))}
      {/*Here, check if action is I or U. If I, show only one view, if U show the same two views as if comparing*/}
      <LineReviewMap
        line={line}
      />
    </div>
  );
}

export default ReviewRequestLayout;
