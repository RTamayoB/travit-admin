"use client";

import { Line, LineHistory } from "@/app/lib/definitions";
import { Button, LinkButton } from "@/ui/components";
import styles from "../../../../../../ui/dashboard/lines/lineslayout.module.scss";
import { useEffect, useState } from "react";
import { Header, Pagination, SearchBar, Table } from "@/ui/sections";
import ConfirmationDialog from "@/ui/sections/dialogs/confirmationdialog";
import { useUserContext } from "@/app/lib/UserContextProvider";

interface LinesLayoutProps {
  lines: LineHistory[];
  totalPages: number;
  onDeleteLine: (lineId: string) => Promise<{ message: string }>;
}

function LineHistoryLayout({
  lines,
  totalPages,
  onDeleteLine,
}: LinesLayoutProps) {
  const [focusedLine, setFocusedLine] = useState<Line | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [lineToDelete, setLineToDelete] = useState<Line | null>(null);

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
      />
      <SearchBar
        searchPlaceholder="Buscar Lineas..."
        className={styles.searchbar}
      />
      <div className={styles.content}>
        <Table
          data={lines}
          keysToIgnore={["id", "old_data", "new_data", "line_id"]}
        />
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

export default LineHistoryLayout;
