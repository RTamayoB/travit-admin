"use client";

import { Stop } from "@/app/lib/definitions";
import { Button, LinkButton } from "@/ui/components";
import styles from "./stopslayout.module.scss";
import { useState } from "react";
import { Header, Pagination, SearchBar, Table } from "@/ui/sections";
import { StopsMap } from "@/ui/sections/maps";
import ConfirmationDialog from "@/ui/sections/dialogs/confirmationdialog";

interface StopsLayoutProps {
  stops: Stop[];
  totalPages: number;
  onDeleteStop: (stopId: string) => Promise<void>;
}

function StopsLayout({
  stops,
  totalPages,
  onDeleteStop,
}: StopsLayoutProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [stopToDelete, setStopToDelete] = useState<Stop | null>(null);

  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

  const handleSelectStop = (stop: Stop) => {
    setSelectedStop(stop);
  };

  const handleDeleteClick = (stop: Stop) => {
    setStopToDelete(stop);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (stopToDelete) {
      await onDeleteStop(stopToDelete.id.toString());
      setDialogOpen(false);
      setStopToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpen(false); // Just close the dialog
    setStopToDelete(null);
  };

  return (
    <div>
      <Header
        breadcrumbList={[{
          label: "Paradas",
          href: "/dashboard/stops",
          active: true,
        }]}
        actions={
          <LinkButton href={"/dashboard/stops/create"} label="Crear Parada +" />
        }
      />
      <SearchBar
        searchPlaceholder="Buscar Paradas..."
        className={styles.searchbar}
      />
      <div className={styles.content}>
        <Table
          data={stops}
          keysToIgnore={["position"]}
          actions={(stop) => (
            <div className={styles.actions}>
              <Button
                primary={false}
                onClick={() => handleSelectStop(stop)}
                leadIconUrl="/images/map-pin.svg"
              />
              <LinkButton
                href={`/dashboard/stops/${stop.id}/edit`}
                primary={false}
                leadIconUrl="/icons/edit.svg"
              />
              <Button
                primary={false}
                onClick={() => handleDeleteClick(stop)}
                leadIconUrl="/icons/delete.svg"
              />
            </div>
          )}
        />
        <StopsMap initialStops={stops} selectedStop={selectedStop} />
        <Pagination totalPages={totalPages} />
      </div>

      {stopToDelete && (
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="¿Eliminar Parada?"
          message={`¿Desea eliminar la parada ${stopToDelete.name}? Esta acción no se podrá deshacer y su información se perderá.`}
        />
      )}
    </div>
  );
}

export default StopsLayout;
