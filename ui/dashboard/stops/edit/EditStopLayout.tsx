import Header from "@/ui/sections/header";
import { Stop } from "@/app/lib/definitions";
import { StopForm } from "@/ui/sections/forms";

interface EditStopLayoutProps {
  stop: Stop;
  onSubmit: (formData: FormData) => Promise<void>;
}

function EditStopLayout({
  stop,
  onSubmit,
}: EditStopLayoutProps) {
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
            label: "Editar Parada",
            href: `/dashboard/stops/${stop.id}/edit`,
            active: true,
          },
        ]}
      />
      <StopForm
        stop={stop}
        onSubmit={onSubmit}
        submitButtonText="Editar Parada"
      />
    </div>
  );
}

export default EditStopLayout;
