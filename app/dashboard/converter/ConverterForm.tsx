"use client";

import { Line, Stop } from "@/app/lib/definitions";
import { useEffect, useMemo, useState, useTransition } from "react";
import { convertLineToRoute } from "./convert-line-to-route";
import { Button, Typography } from "@/ui/components";

type Props = {
  lines: Line[];
};

export default function ConverterForm({ lines }: Props) {
  const [selectedLineId, setSelectedLineId] = useState<number | null>(null);
  const [stops, setStops] = useState<Stop[]>([]);
  const [selectedStopId, setSelectedStopId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>("");

  const selectedLine = useMemo(() => lines.find((l) => l.id === selectedLineId) || null, [lines, selectedLineId]);

  // Extract stops from the line's FeatureCollection properties (startStop/endStop per feature)
  useEffect(() => {
    if (!selectedLine) {
      setStops([]);
      setSelectedStopId(null);
      return;
    }

    const uniqueStops = new Map<number, Stop>();
    for (let i = 0; i < (selectedLine.route?.features?.length || 0); i++) {
      const f = selectedLine.route.features[i];
      const props: any = f.properties || {};
      if (props.startStop && props.startStop.id) {
        uniqueStops.set(props.startStop.id, props.startStop);
      }
      if (props.endStop && props.endStop.id) {
        uniqueStops.set(props.endStop.id, props.endStop);
      }
    }
    setStops(Array.from(uniqueStops.values()));
  }, [selectedLine]);

  function handleConvert() {
    if (!selectedLine || selectedStopId == null) {
      setMessage("Seleccione una línea y una parada");
      return;
    }

    startTransition(async () => {
      const res = await convertLineToRoute({ lineId: selectedLine.id, splitStopId: selectedStopId });
      setMessage(res.message);
    });
  }

  return (
    <div style={{ padding: 16, display: "grid", gap: 16 }}>
      <Typography variant="h2">Convertir Linea a Ruta</Typography>

      <div>
        <label>Linea</label>
        <select
          value={selectedLineId ?? ""}
          onChange={(e) => setSelectedLineId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Seleccione una linea...</option>
          {lines.map((l) => (
            <option key={l.id} value={l.id}>
              #{l.id} - {l.line_number} ({l.legacy_line_number})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Parada para dividir viajes</label>
        <select
          disabled={!selectedLine}
          value={selectedStopId ?? ""}
          onChange={(e) => setSelectedStopId(e.target.value ? Number(e.target.value) : null)}
        >
          <option value="">Seleccione una parada...</option>
          {stops.map((s) => (
            <option key={s.id} value={s.id}>
              #{s.id} - {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Button disabled={isPending || !selectedLine || !selectedStopId} onClick={handleConvert} label={isPending ? "Convirtiendo..." : "Convertir"} />
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

