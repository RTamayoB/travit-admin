"use client";

import { LineRequest } from "@/app/lib/definitions";
import { Button, LinkButton } from "@/ui/components";
import styles from "./linerequestslayout.module.scss";
import { useEffect, useState } from "react";
import { Header, Pagination, SearchBar, Table } from "@/ui/sections";
import ConfirmationDialog from "@/ui/sections/dialogs/confirmationdialog";
import { useUserContext } from "@/app/lib/UserContextProvider";

interface LinesLayoutProps {
  lineRequests: LineRequest[];
  totalPages: number;
  onDeleteLineRequest: (lineRequestId: string) => Promise<{ message: string }>;
}

function MyLinesRequestsLayout({
  lineRequests,
  totalPages,
  onDeleteLineRequest,
}: LinesLayoutProps) {
  const userContext = useUserContext();
  const [role, setRole] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [lineRequestToDelete, setLineRequestToDelete] = useState<LineRequest | null>(null);

  useEffect(() => {
    setRole(userContext.role)
  }, [userContext])

  const handleDeleteClick = (line: LineRequest) => {
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
            label: "Lineas",
            href: "/dashboard/lines",
            active: false,
          },
          {
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
          keysToIgnore={["data", "created_by"]}
          actions={(line) => (
            <div className={styles.actions}>
              <LinkButton
                href={`/dashboard/lines/my-requests/${line.id}/edit`}
                primary={false}
                leadIconUrl="/icons/edit.svg"
              />
              {role == "admin" && (
                <Button
                primary={false}
                onClick={() => handleDeleteClick(line)}
                leadIconUrl="/icons/delete.svg"
              />
              )}
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
