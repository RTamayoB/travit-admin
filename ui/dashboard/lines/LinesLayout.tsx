"use client";

import { Line } from "@/app/lib/definitions";
import { Button, LinkButton } from "@/ui/components";
import styles from "./lineslayout.module.scss";
import { useEffect, useState } from "react";
import { Header, Pagination, SearchBar, Table } from "@/ui/sections";
import { LinesMap } from "@/ui/sections/maps";
import ConfirmationDialog from "@/ui/sections/dialogs/confirmationdialog";
import { useUserContext } from "@/app/lib/UserContextProvider";

interface LinesLayoutProps {
  lines: Line[];
  totalPages: number;
  onDeleteLine: (lineId: string) => Promise<{ message: string }>;
}

function LinesLayout({
  lines,
  totalPages,
  onDeleteLine,
}: LinesLayoutProps) {
  const userContext = useUserContext();
  const [role, setRole] = useState<string | null>(null);
  const [focusedLine, setFocusedLine] = useState<Line | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [lineToDelete, setLineToDelete] = useState<Line | null>(null);

  useEffect(() => {
    setRole(userContext.role);
  }, [userContext]);

  const handleFocusToggle = (line: Line) => {
    if (focusedLine && focusedLine.id === line.id) {
      setFocusedLine(null); // Unfocus
    } else {
      setFocusedLine(line); // Focus
    }
  };

  const handleDeleteClick = (line: Line) => {
    setLineToDelete(line);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (lineToDelete) {
      await onDeleteLine(lineToDelete.id.toString());
      setDialogOpen(false);
      setLineToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpen(false); // Just close the dialog
    setLineToDelete(null); // Reset the lineToDelete
  };

  return (
    <div>
      <Header
        breadcrumbList={[{
          id: 1,
          label: "Lineas",
          href: "/dashboard/lines",
          active: true,
        }]}
        actions={
          <div className={styles.actions}>
            {role == "admin"
              ? (
                <>
                  <LinkButton
                    href={"/dashboard/lines/requests"}
                    label="Ver solicitudes"
                    primary={false}
                  />
                  <LinkButton
                    href={"/dashboard/lines/create"}
                    label="Crear Linea +"
                  />
                </>
              )
              : (
                <>
                  <LinkButton
                    href={"/dashboard/lines/my-requests"}
                    label="Mis solicitudes"
                    primary={false}
                  />
                  <LinkButton
                    href={"/dashboard/lines/create-request"}
                    label="Solicitar Linea +"
                  />
                </>
              )}
          </div>
        }
      />
      <SearchBar
        searchPlaceholder="Buscar Lineas..."
        className={styles.searchbar}
      />
      <div className={styles.content}>
        <Table
          data={lines}
          keysToIgnore={["agency_id", "route_points"]}
          actions={(line) => (
            <div className={styles.actions}>
              <Button
                primary={false}
                onClick={() => handleFocusToggle(line)}
                leadIconUrl={focusedLine && focusedLine.id === line.id
                  ? "/icons/eye.svg"
                  : "/icons/eye-closed.svg"}
              />
              <LinkButton
                href={role == "admin"
                  ? `/dashboard/lines/${line.id}/edit`
                  : `/dashboard/lines/${line.id}/edit-request`}
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
        <LinesMap lines={focusedLine ? [focusedLine] : lines} />
        <Pagination totalPages={totalPages} />
      </div>

      {lineToDelete && (
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="¿Eliminar Linea?"
          message={`¿Desea eliminar la ruta ${lineToDelete.line_number}? Esta acción no se podrá deshacer y su información se perderá.`}
        />
      )}
    </div>
  );
}

export default LinesLayout;
