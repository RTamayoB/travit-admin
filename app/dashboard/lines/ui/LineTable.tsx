import { Line } from '@/app/lib/definitions';
import { deleteLine } from '@/app/dashboard/lines/[id]/edit/data/delete-line';
import Table from '@/shared/components/organisms/TableView/Table/Table';
import Image from "next/image";
import styles from '@/app/dashboard/lines/ui/line-table.module.scss';
import EditIconButton from "@/app/dashboard/components/EditIconButton";
import DeleteIconButton from "@/app/dashboard/components/DeleteIconButton";
import React, {useState} from "react";
import ConfirmationDialog from "@/ui/sections/dialogs/confirmationdialog/ConfirmationDialog";

export default function LineTable({
    lines,
    onFocusToggle,
    focusedLine
}: {
    lines: any[],
    onFocusToggle: (line: Line) => void,
    focusedLine: Line | null
}) {

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [lineToDelete, setLineToDelete] = useState<Line | null>(null);

  const handleDeleteClick = (line: Line) => {
    setLineToDelete(line);
    setDialogOpen(true);
  }

  const handleConfirmDelete = async () => {
    if(lineToDelete) {
      await deleteLine(lineToDelete.id.toString());
      setDialogOpen(false);
      setLineToDelete(null);
    }
  }

  const handleCancelDelete = () => {
    setDialogOpen(false);  // Just close the dialog
    setLineToDelete(null); // Reset the lineToDelete
  };
  const renderActions = (line: Line) => (
    <div className={styles.actions}>
      <button
        onClick={() => onFocusToggle(line)}
        title="Enfocar/Desenfocar"
      >
        {
          focusedLine && focusedLine.id === line.id ?
          <Image
            src={'/images/eye-open.svg'}
            width={24}
            height={24}
            blurDataURL={'/images/eye-open.svg'}
            alt={'UnFocus'}
          /> :
          <Image
            src={'/images/eye-closed.svg'}
            width={24}
            height={24}
            blurDataURL={'/images/eye-closed.svg'}
            alt={'Focus'}
          />
        }
      </button>
      <EditIconButton href={`/dashboard/lines/${line.id}/edit`} />
      <DeleteIconButton action={() => handleDeleteClick(line)} />
    </div>
  );

  return (
    <>
      <Table
        data={lines}
        keysToIgnore={['route_points']}
        renderActions={renderActions}
      />

      {lineToDelete && (
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="¿Eliminar Linea?"
          message={`¿Desea eliminar la ruta ${lineToDelete.line_number}? Esta acción no se podrá deshacer y su información se perderá.`}
        />
      )}
    </>
  );
}
