'use client';

import { Header } from "@/ui/sections";
import RouteForm from "../ui/RouteForm";
import { Agency, Stop } from "@/app/lib/definitions";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { redirect } from "next/navigation";

interface CreateRouteLayoutProps {
  agencies: Agency[];
  stops: Stop[];
}

function CreateRouteLayout({
  agencies,
  stops
}: CreateRouteLayoutProps) {

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
            label: "Nueva Ruta",
            href: "/dashboard/routes/create",
            active: true,
          },
        ]}
      />
      <RouteForm
        stops={stops}
        agencies={agencies}
        submitButtonText={"Crear Ruta"}
      />
    </div>
  );
}

export default CreateRouteLayout;