"use client";

import { Button, LinkButton } from "@/ui/components";
import styles from "./routeslayout.module.scss";
import { useEffect, useState } from "react";
import { Header, Pagination, SearchBar, Table } from "@/ui/sections";
import ConfirmationDialog from "@/ui/sections/dialogs/confirmationdialog";
import { useUserContext } from "@/app/lib/UserContextProvider";
import dynamic from "next/dynamic";
const RoutesMap = dynamic(() => import('@/ui/sections/maps/routesmap'), { ssr: false });
import { Route } from "@/app/lib/definitions";

interface RoutesLayoutProps {
  routes: Route[];
  totalPages: number;
  onDeleteRoute: (lineId: string) => Promise<{ message: string }>;
}

function RoutesLayout({
  routes,
  totalPages,
  onDeleteRoute,
}: RoutesLayoutProps) {
  const userContext = useUserContext();
  const [role, setRole] = useState<string | null>(null);
  const [focusedRoute, setFocusedRoute] = useState<Route | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState<Route | null>(null);

  useEffect(() => {
    setRole(userContext.role);
  }, [userContext]);

  const handleFocusToggle = (line: Route) => {
    if (focusedRoute && focusedRoute.id === line.id) {
      setFocusedRoute(null); // Unfocus
    } else {
      setFocusedRoute(line); // Focus
    }
  };

  const handleDeleteClick = (line: Route) => {
    setRouteToDelete(line);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (routeToDelete && routeToDelete.id) {
      await onDeleteRoute(routeToDelete.id.toString());
      setDialogOpen(false);
      setRouteToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
    setRouteToDelete(null);
  };

  return (
    <div>
      <Header
        breadcrumbList={[{
          id: 1,
          label: "Rutas",
          href: "/dashboard/routes",
          active: true,
        }]}
        actions={
          <div className={styles.actions}>
            {role == "admin"
              ? (
                <>
                  <LinkButton
                    href={"/dashboard/routes/requests"}
                    label="Ver solicitudes"
                    primary={false}
                  />
                  <LinkButton
                    href={"/dashboard/routes/create"}
                    label="Crear Ruta +"
                  />
                </>
              )
              : (
                <>
                  <LinkButton
                    href={"/dashboard/routes/my-requests"}
                    label="Mis solicitudes"
                    primary={false}
                  />
                  <LinkButton
                    href={"/dashboard/routes/create-request"}
                    label="Solicitar Ruta +"
                  />
                </>
              )}
          </div>
        }
      />
      <SearchBar
        searchPlaceholder="Buscar Rutas..."
        className={styles.searchbar}
      />
      <div className={styles.content}>
        <Table
          data={routes}
          keysToIgnore={["agency_id", "trips"]}
          actions={(route) => (
            <div className={styles.actions}>
              <Button
                primary={false}
                onClick={() => handleFocusToggle(route)}
                leadIconUrl={focusedRoute && focusedRoute.id === route.id
                  ? "/icons/eye.svg"
                  : "/icons/eye-closed.svg"}
              />
              <LinkButton
                href={role == "admin"
                  ? `/dashboard/routes/${route.id}/edit`
                  : `/dashboard/routes/${route.id}/edit-request`}
                primary={false}
                leadIconUrl="/icons/edit.svg"
              />
              {role == "admin" && (
                <Button
                  primary={false}
                  onClick={() => handleDeleteClick(route)}
                  leadIconUrl="/icons/delete.svg"
                />
              )}
            </div>
          )}
        />
        <RoutesMap routes={focusedRoute ? [focusedRoute] : routes} />
        <Pagination totalPages={totalPages} />
      </div>

      {routeToDelete && (
        <ConfirmationDialog
          isOpen={isDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          title="¿Eliminar Ruta?"
          message={`¿Desea eliminar la ruta ${routeToDelete.short_name}? Esta acción no se podrá deshacer y su información se perderá.`}
        />
      )}
    </div>
  );
}

export default RoutesLayout;
