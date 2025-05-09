"use client";

import { LineChangeRequest } from "@/app/lib/definitions";
import { LinkButton } from "@/ui/components";
import styles from "./linerequestslayout.module.scss";
import { useState } from "react";
import { Header, Pagination, SearchBar, Table } from "@/ui/sections";
import ConfirmationDialog from "@/ui/sections/dialogs/confirmationdialog";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { redirect } from "next/navigation";

interface LinesLayoutProps {
  lineRequests: LineChangeRequest[];
  totalPages: number;
  onDeleteLineRequest: (lineRequestId: string) => Promise<{ message: string }>;
}

function MyLinesRequestsLayout({
  lineRequests,
  totalPages,
  onDeleteLineRequest,
}: LinesLayoutProps) {
  const { role } = useUserContext();
  
  if (role != "moderator") {
    redirect("/dashboard/lines");
  }

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [lineRequestToDelete, setLineRequestToDelete] = useState<
    LineChangeRequest | null
  >(null);

  const handleDeleteClick = (line: LineChangeRequest) => {
    setLineRequestToDelete(line);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (lineRequestToDelete) {
      await onDeleteLineRequest(lineRequestToDelete.id.toString());
      setDialogOpen(false);
      setLineRequestToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpen(false); // Just close the dialog
    setLineRequestToDelete(null); // Reset the lineToDelete
  };

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
            label: "Mis Solicitudes",
            href: "/dashboard/lines/my-requests",
            active: true,
          },
        ]}
      />
      <SearchBar
        searchPlaceholder="Buscar Solicitud..."
        className={styles.searchbar}
      />
      <div className={styles.content}>
        <Table
          data={lineRequests}
          keysToIgnore={["data", "requester_name"]}
          actions={(line) => (
            <div className={styles.actions}>
              <LinkButton
                href={`/dashboard/lines/my-requests/${line.id}`}
                primary={false}
                leadIconUrl="/icons/edit.svg"
              />
            </div>
          )}
        />
        <Pagination totalPages={totalPages} />
      </div>

      {lineRequestToDelete && (
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="¿Eliminar Linea?"
          message={`¿Desea eliminar la solicitud? Esta acción no se podrá deshacer y su información se perderá.`}
        />
      )}
    </div>
  );
}

export default MyLinesRequestsLayout;
