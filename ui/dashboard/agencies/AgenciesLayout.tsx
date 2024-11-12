"use client";

import { Agency } from "@/app/lib/definitions";
import { Button, LinkButton } from "@/ui/components";
import styles from "./agencieslayout.module.scss";
import { useState } from "react";
import { Header, Pagination, SearchBar, Table } from "@/ui/sections";
import ConfirmationDialog from "@/ui/sections/dialogs/confirmationdialog";

interface AgenciesLayoutProps {
  agencies: Agency[];
  totalPages: number;
  onDeleteAgency: (agencyId: String) => Promise<void>;
}

function AgenciesLayout({
  agencies,
  totalPages,
  onDeleteAgency,
}: AgenciesLayoutProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [agencyToDelete, setAgencyToDelete] = useState<Agency | null>(null);

  const handleDeleteClick = (agency: Agency) => {
    setAgencyToDelete(agency);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (agencyToDelete) {
      await onDeleteAgency(agencyToDelete.id.toString());
      setDialogOpen(false);
      setAgencyToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpen(false); // Just close the dialog
    setAgencyToDelete(null);
  };

  return (
    <div>
      <Header
        breadcrumbList={[{
          label: "Concesionarias",
          href: "/dashboard/agencies",
          active: true,
        }]}
        actions={
          <LinkButton
            href={"/dashboard/agencies/create"}
            label="Crear Concesionaria +"
          />
        }
      />
      <SearchBar
        searchPlaceholder="Buscar Concesionarias..."
        className={styles.searchbar}
      />
      <div className={styles.content}>
        <Table
          data={agencies}
          actions={(agency) => (
            <div className={styles.actions}>
              <LinkButton
                href={`/dashboard/agencies/${agency.id}/edit`}
                primary={false}
                leadIconUrl="/icons/edit.svg"
              />
              <Button
                primary={false}
                onClick={() => handleDeleteClick(agency)}
                leadIconUrl="/icons/delete.svg"
              />
            </div>
          )}
        />
        <Pagination totalPages={totalPages} />
      </div>

      {agencyToDelete && (
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="¿Eliminar Concesionaria?"
          message={`¿Desea eliminar la concesionaria ${agencyToDelete.name}? Esta acción no se podrá deshacer y su información se perderá.`}
        />
      )}
    </div>
  );
}

export default AgenciesLayout;
