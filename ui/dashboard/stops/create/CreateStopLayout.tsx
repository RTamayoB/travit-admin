import Header from "@/ui/sections/header";
import { StopForm } from "@/ui/sections/forms";

interface CreateStopLayoutProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

function CreateStopLayout({
  onSubmit,
}: CreateStopLayoutProps) {
  return (
    <div>
      <Header
        breadcrumbList={[
          {
            label: "Paradas",
            href: "/dashboard/stops",
            active: false,
          },
          {
            label: "Crear Parada",
            href: "/dashboard/stops/create",
            active: true,
          },
        ]}
      />
      <StopForm
        onSubmit={onSubmit}
        submitButtonText="Crear Parada"
      />
    </div>
  );
}

export default CreateStopLayout;
