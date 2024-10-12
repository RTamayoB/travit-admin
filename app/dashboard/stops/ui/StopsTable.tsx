'use client';

import { deleteStop } from '@/app/dashboard/stops/data/delete-stop';
import Table from '@/shared/components/organisms/TableView/Table/Table';
import Image from "next/image";
import styles from '@/app/dashboard/stops/ui/stop-table.module.scss';
import EditIconButton from '../../components/EditIconButton';
import DeleteIconButton from '../../components/DeleteIconButton';
import { useState } from 'react';
import {Stop} from "@/app/lib/definitions";
import ConfirmationDialog from '@/shared/components/molecules/ConfirmationDialog/ConfirmationDialog';

export default function StopsTable({
    stops,
    onLocateStop
}: {
  stops: any[],
  onLocateStop: (stop: any) => void
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [stopToDelete, setStopToDelete] = useState<Stop | null>(null);

  const handleDeleteClick = (line: Stop) => {
    setStopToDelete(line);
    setDialogOpen(true);
  }

  const handleConfirmDelete = async () => {
    if(stopToDelete) {
      await deleteStop(stopToDelete.id.toString());
      setDialogOpen(false);
      setStopToDelete(null);
    }
  }

  const handleCancelDelete = () => {
    setDialogOpen(false);  // Just close the dialog
    setStopToDelete(null); // Reset the lineToDelete
  };

  const renderActions = (stop: any) => (
    <div className={styles.actions}>
      <button
        onClick={() => onLocateStop(stop)}
        title="Ver parada"
      >
      <Image
        src={'/images/map-pin.svg'}
        width={24}
        height={24}
        blurDataURL={'/images/map-pin.svg'}
        alt={'Locate stop'}
      />
      </button>
      <EditIconButton href={`/dashboard/stops/${stop.id}/edit`} />
      <DeleteIconButton action={() => handleDeleteClick(stop)} />
    </div>
  );
      
  return (
    <>
      <Table
        data={stops}
        renderActions={renderActions}
        keysToIgnore={['position']}
      />

      {stopToDelete && (
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="¿Eliminar Parada?"
          message={`¿Desea eliminar la parada ${stopToDelete.name}? Esta acción no se podrá deshacer y su información se perderá.`}
        />
      )}
    </>

  );
}
