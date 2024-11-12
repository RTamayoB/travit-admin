'use client';

import Map from "@/app/dashboard/components/Map";
import { Agency, Line, RoutePoint, Stop } from "@/app/lib/definitions";
import { Button, TextField } from "@/shared/components/atoms";
import { useState } from "react";
import MapComponent from "@/app/dashboard/lines/[id]/edit/ui/MapComponent";
import Link from "next/link";
import Typography from "@/ui/components/typography";
import LineEditMap from "@/ui/sections/maps/lineeditmap";
import { DropdownOption } from "@/ui/components/dropdown";

interface LineFormProps {
  stops: Stop[];
  agencies: Agency[];
  line: Line;
  onSubmit: (formData: FormData) => Promise<void>;
  submitButtonText: string;
}

export default function LineForm({
  stops,
  agencies,
  line,
  onSubmit,
  submitButtonText,
}: LineFormProps) {
  const [routePoints, setRoutePoints] = useState(line.route_points);

  const handleRoutePointsUpdate = (updatedRoutePoints: RoutePoint[]) => {
    setRoutePoints(updatedRoutePoints);
  };

  return (
    <form action={onSubmit}>
      <TextField id="line_number" label="Numero de Linea" defaultValue={line.line_number} />
      <TextField id="legacy_line_number" label="Numero anterior de Linea" defaultValue={line.legacy_line_number} />
      <TextField id="units" label="Numero de Unidades" defaultValue={line.units} />
      <input type="hidden" name="transport_type" value="bus" />
      <input type="hidden" name="routePoints" value={JSON.stringify(routePoints)} />
      <LineEditMap
        stops={stops}
        routePoints={routePoints}
        onRoutePointsUpdate={handleRoutePointsUpdate}
      />
      <Typography variant={"note"}>Haz click derecho en cualquier lugar del mapa para colocar un punto de la ruta.</Typography>
      <Typography variant={"note"}>Para mover cualquier punto, arrastralo hacia una nueva posicion.</Typography>
      <Typography variant={"note"}>Si arrastras un punto encima de una parada, este cambiara de color, indicando que esta es una parada del recorrido.</Typography>
      <Typography variant={"note"}>Si arrastras los puntos grises entre dos puntos ya creados, podras añadir bifurcaciones a tu ruta</Typography>
      <Typography variant={"note"}>Para eliminar el ultimo punto de la ruta, has Shift+D</Typography>
      <div>
        <Link href={"/dashboard/lines"}>Cancelar</Link>
        <Button type="submit">{submitButtonText}</Button>
      </div>
    </form>
  );
}
