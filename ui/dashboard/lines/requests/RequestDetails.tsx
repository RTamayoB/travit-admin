import { LineChangeRequest } from "@/app/lib/definitions";
import LabelValuePair from "@/ui/components/labelvaluepair";

function RequestDetails({
  request
}: {
  request: LineChangeRequest
}) {

  const date = new Date(request.created_at)

  const details = [
    { label: "Fecha de Solicitud", value: date.toLocaleString() },
    { label: "Creador de la Solicitud", value: request.requester_name },
    { label: "Accion", value: request.action },
    { label: "Estado", value: request.status },
  ];

  return(
    <div>
      {details.map((detail, index) => (
        <LabelValuePair
          key={index}
          label={detail.label}
          value={detail.value}
        />
      ))}
    </div>
  )
}

export default RequestDetails;