"use client";

import { LineChangeRequest } from "@/app/lib/definitions";
import { Button, LinkButton } from "@/ui/components";
import styles from "../my-requests/linerequestslayout.module.scss";
import { useEffect, useState } from "react";
import { Header, Pagination, SearchBar, Table } from "@/ui/sections";
import ConfirmationDialog from "@/ui/sections/dialogs/confirmationdialog";
import { useUserContext } from "@/app/lib/UserContextProvider";

interface LinesLayoutProps {
  lineRequests: LineChangeRequest[];
  totalPages: number;
  onDeleteLineRequest: (lineRequestId: string) => Promise<{ message: string }>;
}

function AllLinesRequestsLayout({
  lineRequests,
  totalPages,
  onDeleteLineRequest,
}: LinesLayoutProps) {
  const userContext = useUserContext();
  const [role, setRole] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [lineRequestToDelete, setLineRequestToDelete] = useState<
    LineChangeRequest | null
  >(null);

  useEffect(() => {
    setRole(userContext.role);
  }, [userContext]);

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
            label: "Solicitudes",
            href: "/dashboard/lines/requests",
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
          keysToIgnore={["data"]}
          actions={(line) => (
            <div className={styles.actions}>
              <LinkButton
                href={`/dashboard/lines/requests/${line.id}`}
                primary={false}
                leadIconUrl="/icons/clipboard-check.svg"
              />
              <Button
                primary={false}
                onClick={() => handleDeleteClick(line)}
                leadIconUrl="/icons/delete.svg"
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

export default AllLinesRequestsLayout;
