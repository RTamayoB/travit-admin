import Header from "@/ui/sections/header";
import LineForm from "@/ui/sections/forms/lineform";
import { Agency, Stop } from "@/app/lib/definitions";

interface CreateLineLayoutProps {
  agencies: Agency[];
  stops: Stop[];
  onSubmit: (formData: FormData) => Promise<void>;
}

function CreateLineLayout({
  agencies,
  stops,
  onSubmit,
}: CreateLineLayoutProps) {
  return (
    <div>
      <Header
        breadcrumbList={[
          {
            label: "Lineas",
            href: "/dashboard/lines",
            active: false,
          },
          {
            label: "Crear Linea",
            href: "/dashboard/lines/create",
            active: true,
          },
        ]}
      />
      <LineForm
        stops={stops}
        agencies={agencies}
        onSubmit={onSubmit}
        submitButtonText="Crear Linea"
      />
    </div>
  );
}

export default CreateLineLayout;
