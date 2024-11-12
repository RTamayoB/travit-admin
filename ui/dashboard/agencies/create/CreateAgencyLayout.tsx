import Header from "@/ui/sections/header";
import { Agency, Stop } from "@/app/lib/definitions";
import { AgencyForm } from "@/ui/sections/forms";

interface CreateAgencyLayoutProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

function CreateAgencyLayout({
  onSubmit,
}: CreateAgencyLayoutProps) {
  return (
    <div>
      <Header
        breadcrumbList={[
          {
            label: "Concesionarias",
            href: "/dashboard/agencies",
            active: false,
          },
          {
            label: "Crear Concesionaria",
            href: "/dashboard/agencies/create",
            active: true,
          },
        ]}
      />
      <AgencyForm
        onSubmit={onSubmit}
        submitButtonText="Crear Concesionaria"
      />
    </div>
  );
}

export default CreateAgencyLayout;
