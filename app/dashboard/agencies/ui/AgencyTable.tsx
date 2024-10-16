import { Agency } from '@/app/lib/definitions';
import Table from '@/shared/components/organisms/TableView/Table/Table';
import styles from '@/app/dashboard/lines/ui/line-table.module.scss';
import { deleteAgency } from '../data/delete-agency';
import EditIconButton from '../../components/EditIconButton';
import DeleteIconButton from '../../components/DeleteIconButton';
import React, { useState } from 'react';
import ConfirmationDialog from '@/shared/components/molecules/ConfirmationDialog/ConfirmationDialog';

export default function AgencyTable({
    agencies,
}: {
  agencies: any[],
}) {

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [agencyToDelete, setAgencyToDelete] = useState<Agency | null>(null);

  const handleDeleteClick = (line: Agency) => {
    setAgencyToDelete(line);
    setDialogOpen(true);
  }

  const handleConfirmDelete = async () => {
    if(agencyToDelete) {
      await deleteAgency(agencyToDelete.id.toString());
      setDialogOpen(false);
      setAgencyToDelete(null);
    }
  }

  const handleCancelDelete = () => {
    setDialogOpen(false);  // Just close the dialog
    setAgencyToDelete(null); // Reset the lineToDelete
  };
  const renderActions = (agency: Agency) => (
    <div className={styles.actions}>
      <EditIconButton href={`/dashboard/agencies/${agency.id}/edit`} />
      <DeleteIconButton action={() => handleDeleteClick(agency)} />
    </div>
  );

  return (
    <>
      <Table
        data={agencies}
        renderActions={renderActions}
      />

      {agencyToDelete && (
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="¿Eliminar Concesionaria?"
          message={`¿Desea eliminar la concesionaria ${agencyToDelete.name}? Esta acción no se podrá deshacer y su información se perderá.`}
        />
      )}
    </>
  );
}
