import Header from "@/ui/sections/header";
import LineForm from "@/ui/sections/forms/lineform";
import { Agency, Line, Stop } from "@/app/lib/definitions";

interface EditLineLayoutProps {
  agencies: Agency[];
  stops: Stop[];
  line: Line;
  onSubmit: (formData: FormData) => Promise<void>;
}

function EditLineLayout({
  agencies,
  stops,
  line,
  onSubmit,
}: EditLineLayoutProps) {
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
            label: "Editar Linea",
            href: `/dashboard/lines/${line.id}/edit`,
            active: true,
          },
        ]}
      />
      <LineForm
        stops={stops}
        agencies={agencies}
        line={line}
        onSubmit={onSubmit}
        submitButtonText="Editar Linea"
      />
    </div>
  );
}

export default EditLineLayout;
