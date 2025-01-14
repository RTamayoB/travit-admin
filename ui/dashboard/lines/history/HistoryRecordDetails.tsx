import { LineHistory } from "@/app/lib/definitions";
import LabelValuePair from "@/ui/components/labelvaluepair";

function HistoryRecordDetails({
  record
}: {
  record: LineHistory
}) {

  const date = new Date(record.created_at)

  const details = [
    { label: "Fecha de Solicitud", value: date.toLocaleString() },
    { label: "Linea", value: record.line_id.toString() },
    { label: "Tipo de Accion", value: record.action },
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

export default HistoryRecordDetails;