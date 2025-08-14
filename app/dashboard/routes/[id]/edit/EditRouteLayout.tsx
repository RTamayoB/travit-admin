"use client";

import Header from "@/ui/sections/header";
import { Agency, Route, Stop } from "@/app/lib/definitions";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { LinkButton } from "@/ui/components";
import { redirect } from "next/navigation";
import RouteForm from "../../../routes/ui/RouteForm";

interface EditRouteLayoutProps {
  agencies: Agency[];
  stops: Stop[];
  route: Route;
}

function EditRouteLayout({
  agencies,
  stops,
  route,
}: EditRouteLayoutProps) {
  const { role } = useUserContext();

  if (role != "admin") {
    redirect("/dashboard/routes");
  }

  return (
    <div>
      <Header
        breadcrumbList={[
          {
            id: 1,
            label: "Rutas",
            href: "/dashboard/routes",
            active: false,
          },
          {
            id: 2,
            label: "Editar Ruta",
            active: true,
          },
        ]}
        actions={
          <>
            {role == "admin" && (
              <LinkButton
                href={`/dashboard/routes/${route.id}/history`}
                label="Ver historial"
              />
            )}
          </>
        }
      />
      {role
        ? (
          <RouteForm
            stops={stops}
            agencies={agencies}
            route={route}
            submitButtonText={"Editar Ruta"}
          />
        )
        : <p>Loading...</p>}
    </div>
  );
}

export default EditRouteLayout;