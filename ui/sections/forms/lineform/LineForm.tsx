"use client";

import { Agency, Line, RoutePoint, Stop } from "@/app/lib/definitions";
import { Button, LinkButton, TextField, Typography } from "@/ui/components";
import { useState } from "react";
import LineEditMap from "../../maps/lineeditmap";
import styles from "../form.module.scss";
import Dropdown, { DropdownOption } from "@/ui/components/dropdown";

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
    route_points: [],
  },
  onSubmit,
  submitButtonText,
}: LineFormProps) {
  const [routePoints, setRoutePoints] = useState(line.route_points);
  const [lineType, setLineType] = useState(line.line_type);
  const [agencyId, setAgencyId] = useState(line.agency_id);

  const handleRoutePointsUpdate = (updatedRoutePoints: RoutePoint[]) => {
    setRoutePoints(updatedRoutePoints);
  };

  const lineTypeOptions: DropdownOption<string>[] = [
    { value: "Troncal", key: "troncal" },
    { value: "Complementaria", key: "complementaria" },
    { value: "Alimentadora", key: "alimentadora" },
    { value: "Linea", key: "linea" },
  ];

  const agencyOptions: DropdownOption<number>[] = agencies.map((agency) => ({
    value: agency.name,
    key: agency.id,
  }));

  return (
    <form action={onSubmit}>
      <div className={styles.fieldsContainer}>
        <TextField
          id="line_number"
          name="line_number"
          label="Numero de Linea"
          value={line.line_number}
          className={styles["fieldsContainer--field"]}
        />
        <TextField
          id="legacy_line_number"
          name="legacy_line_number"
          label="Numero anterior de Linea"
          value={line.legacy_line_number}
          className={styles["fieldsContainer--field"]}
        />
        <TextField
          id="units"
          name="units"
          label="Numero de Unidades"
          value={line.units.toString()}
          className={styles["fieldsContainer--field"]}
        />
        <Dropdown
          options={lineTypeOptions}
          defaultOption={lineTypeOptions.find((option) =>
            option.key == lineType
          )}
          onOptionSelected={(value) => setLineType(value)}
          label="Tipo de Linea"
          className={styles["fieldsContainer--field"]}
        />
        <Dropdown
          options={agencyOptions}
          defaultOption={agencyOptions.find((option) => option.key == agencyId)}
          onOptionSelected={(value) => setAgencyId(value)}
          label="Concesionaria"
          className={styles["fieldsContainer--field"]}
        />
        <input type="hidden" name="line_type" value={lineType} />
        <input type="hidden" name="agency_id" value={agencyId} />
        <input type="hidden" name="transport_type" value="bus" />
        <input
          type="hidden"
          name="routePoints"
          value={JSON.stringify(routePoints)}
        />
        <LineEditMap
          stops={stops}
          routePoints={routePoints}
          onRoutePointsUpdate={handleRoutePointsUpdate}
        />
        <Typography variant={"note"}>
          Haz click derecho en cualquier lugar del mapa para colocar un punto de
          la ruta.
        </Typography>
        <Typography variant={"note"}>
          Para mover cualquier punto, arrastralo hacia una nueva posicion.
        </Typography>
        <Typography variant={"note"}>
          Si arrastras un punto encima de una parada, este cambiara de color,
          indicando que esta es una parada del recorrido.
        </Typography>
        <Typography variant={"note"}>
          Si arrastras los puntos grises entre dos puntos ya creados, podras
          añadir bifurcaciones a tu ruta
        </Typography>
        <Typography variant={"note"}>
          Para eliminar el ultimo punto de la ruta, has Shift+D
        </Typography>
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
