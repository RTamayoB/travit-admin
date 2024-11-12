import Header from "@/ui/sections/header";
import { Agency } from "@/app/lib/definitions";
import { AgencyForm } from "@/ui/sections/forms";

interface EditAgencyLayoutProps {
  agency: Agency;
  onSubmit: (formData: FormData) => Promise<void>;
}

function EditAgencyLayout({
  agency,
  onSubmit,
}: EditAgencyLayoutProps) {
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
            label: "Editar Concesionaria",
            href: `/dashboard/agencies/${agency.id}/edit`,
            active: true,
          },
        ]}
      />
      <AgencyForm
        agency={agency}
        onSubmit={onSubmit}
        submitButtonText="Editar Concesionaria"
      />
    </div>
  );
}

export default EditAgencyLayout;
