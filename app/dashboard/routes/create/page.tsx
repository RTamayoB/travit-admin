import { getAllStops } from "@/app/dashboard/lines/data/get-all-stops";
import { getAgenciesById } from "../../lines/(admin)/create/data/get-agencies-by-id";
import { Header } from "@/ui/sections";
import RouteForm from "./RouteForm";

export default async function Page() {

  const agencies = await getAgenciesById();
  const stops = await getAllStops();

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