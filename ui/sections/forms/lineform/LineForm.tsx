'use client';

import { Agency, Line, RoutePoint, Stop } from "@/app/lib/definitions";
import { Button, LinkButton, TextField, Typography } from "@/ui/components";
import { useState } from "react";
import LineEditMap from "../../maps/lineeditmap";
import styles from '../form.module.scss';
import { Dropdown, Option } from "@/ui/components/dropdown";
import { Combobox } from "@/ui/components/combobox";

interface LineFormProps {
  stops: Stop[];
  agencies: Agency[];
  line?: Line;
  onSubmit: (formData: FormData) => Promise<void>;
  submitButtonText: string;
}

function LineForm({
  stops,
  agencies,
  line = {
    id: 0,
    line_number: "",
    legacy_line_number: "",
    units: 0,
    agency_id: 0,
    transport_type: "",
    line_type: "",
    route_points: []
  },
  onSubmit,
  submitButtonText
}: LineFormProps) {

  const [routePoints, setRoutePoints] = useState(line.route_points);

  const handleRoutePointsUpdate = (updatedRoutePoints: RoutePoint[]) => {
    setRoutePoints(updatedRoutePoints);
  };

  const agencyOptions: Option[] = agencies.map((agency) => ({
    label: agency.name,
    value: agency.id.toString(),
  }));

  const lineOptions: Option[] = [
    { label: 'Troncal', value: 'troncal' },
    { label: 'Complementaria', value: 'complementaria' },
    { label: 'Alimentadora', value: 'alimentadora' },
    { label: 'Linea', value: 'linea' },
  ];

  return (
    <form action={onSubmit}>
      <div className={styles.fieldsContainer}>
        <TextField id="line_number" label="Numero de Linea" value={line.line_number} className={styles['fieldsContainer--field']}/>
        <TextField id="legacy_line_number" label="Numero anterior de Linea" value={line.legacy_line_number} className={styles['fieldsContainer--field']}/>
        <TextField id="units" label="Numero de Unidades" value={line.units.toString()} className={styles['fieldsContainer--field']}/>
        <Dropdown data={lineOptions} onSelected={() => 1} name="line_type" label="Tipo de Linea" />
        <Combobox
          data={agencyOptions}
          name="agency_id"
          label="Concesionaria"
          onSelected={() => line.agency_id}
        />
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
      </div>
      <div className={styles.actions}>
        <LinkButton
          href={"/dashboard/lines"}
          primary={false}
          label="Cancelar"
        />
        <Button
          label={submitButtonText}
          type="submit"
        />
      </div>
    </form>
  );
}

export default LineForm;
