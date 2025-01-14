import { Line } from "@/app/lib/definitions";
import LabelValuePair from "@/ui/components/labelvaluepair";
import dynamic from "next/dynamic";

const LineReviewMap = dynamic(() => import('@/ui/sections/maps/linereviewmap/LineReviewMap'), { ssr: false });


interface SimpleLineViewProps {
  line: Line;
  agency: string
}

function SimpleLineView({
  line,
  agency
}: SimpleLineViewProps) {

  const lineDetails = [
    { label: "Numero de Linea", value: line.line_number },
    { label: "Numero de anterior de Linea", value: line.legacy_line_number },
    { label: "Numero de Unidades", value: line.units.toString() },
    { label: "Tipo de Linea", value: line.line_type },
    { label: "Concesionaria", value: agency},
  ];
  return (
    <div>
      {lineDetails.map((detail, index) => (
        <LabelValuePair
          key={index}
          label={detail.label}
          value={detail.value}
        />
      ))}
      <LineReviewMap
        line={line}
      />
    </div>
  );
}

export default SimpleLineView;