"use client";

import {
  Agency,
  Line,
  LineSection,
  LineState,
  RoutePoint,
  Stop,
} from "@/app/lib/definitions";
import { Button, LinkButton, TextField, Typography } from "@/ui/components";
import { useState } from "react";
import styles from "../form.module.scss";
import Dropdown, { DropdownOption } from "@/ui/components/dropdown";
import dynamic from "next/dynamic";
import { NewLineEditMap } from "../../maps/lineeditmap";
import { FeatureCollection, LineString } from "geojson";

const LineEditMap = dynamic(
  () => import("@/ui/sections/maps/lineeditmap/LineEditMap"),
  { ssr: false },
);

interface LineFormProps {
  stops: Stop[];
  agencies: Agency[];
  line?: Line;
  onSubmit: (formData: FormData) => void;
  state: LineState;
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
    route: { type: "FeatureCollection", features: [] }
  },
  onSubmit,
  state,
  submitButtonText,
}: LineFormProps) {
  const [routePoints, setRoutePoints] = useState(line.route_points);
  const [route, setRoute] = useState(line.route);
  const [lineType, setLineType] = useState(line.line_type);
  const [agencyId, setAgencyId] = useState(line.agency_id);

  const handleRoutePointsUpdate = (updatedRoutePoints: RoutePoint[]) => {
    setRoutePoints(updatedRoutePoints);
  };

  const handleFeatureCollectionUpdate = (updatedFeatureCollection: FeatureCollection<LineString, LineSection>) => {
    setRoute(updatedFeatureCollection)
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
        <div id="line_number" aria-live="polite" aria-atomic="true">
          {state.errors?.line_number &&
            state.errors.line_number.map((error: string) => (
              <Typography variant="bodySmall" color="red" key={error}>
                {error}
              </Typography>
            ))}
        </div>
        <TextField
          id="legacy_line_number"
          name="legacy_line_number"
          label="Numero anterior de Linea"
          value={line.legacy_line_number}
          className={styles["fieldsContainer--field"]}
        />
        <div id="legacy_line_number" aria-live="polite" aria-atomic="true">
          {state.errors?.legacy_line_number &&
            state.errors.legacy_line_number.map((error: string) => (
              <Typography variant="bodySmall" color="red" key={error}>
                {error}
              </Typography>
            ))}
        </div>
        <TextField
          id="units"
          name="units"
          label="Numero de Unidades"
          value={line.units.toString()}
          className={styles["fieldsContainer--field"]}
        />
        <div id="units" aria-live="polite" aria-atomic="true">
          {state.errors?.units &&
            state.errors.units.map((error: string) => (
              <Typography variant="bodySmall" color="red" key={error}>
                {error}
              </Typography>
            ))}
        </div>
        <Dropdown
          options={lineTypeOptions}
          defaultOption={lineTypeOptions.find((option) =>
            option.key == lineType
          )}
          onOptionSelected={(value) => setLineType(value)}
          label="Tipo de Linea"
          className={styles["fieldsContainer--field"]}
        />
        <div id="line_type" aria-live="polite" aria-atomic="true">
          {state.errors?.line_type &&
            state.errors.line_type.map((error: string) => (
              <Typography variant="bodySmall" color="red" key={error}>
                {error}
              </Typography>
            ))}
        </div>
        <Dropdown
          options={agencyOptions}
          defaultOption={agencyOptions.find((option) => option.key == agencyId)}
          onOptionSelected={(value) => setAgencyId(value)}
          label="Concesionaria"
          className={styles["fieldsContainer--field"]}
          aria-describedby="agency-error"
        />
        <div id="customer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.agency_id &&
            state.errors.agency_id.map((error: string) => (
              <Typography variant="bodySmall" color="red" key={error}>
                {error}
              </Typography>
            ))}
        </div>
        <input type="hidden" name="line_type" value={lineType} />
        <input type="hidden" name="agency_id" value={agencyId} />
        <input type="hidden" name="transport_type" value="bus" />
        <input
          type="hidden"
          name="route_points"
          value={JSON.stringify(routePoints)}
        />
        <input
          type="hidden"
          name="route"
          value={JSON.stringify(route)}
        />
        {routePoints.length > 0 ?
          (
            <div>
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
          ) :
          (
            <div>
              <NewLineEditMap
                stops={stops}
                initialFeatureCollection={route}
                onFeatureCollectionUpdate={handleFeatureCollectionUpdate}
              />
              <Typography variant={"note"}>
                Da click en una parada para comenzar el recorrido. Si se tiene mas de una parada señalada, dar click añade una nueva seccion a la linea.
              </Typography>
              <Typography variant={"note"}>
                Puedes seleccionar cualquier seccion entre 2 paradas para jalar y agregar un anclaje a la linea.
              </Typography>
              <Typography variant={"note"}>
                Para mover un anclaje, solo arrastralo a una nueva posicion. Has doble click en un anclaje para eliminarlo de la ruta.
              </Typography>
              <Typography variant={"note"}>
                Presiona Shift+D para deshacer la ultima accion realizada.
              </Typography>
            </div>
          )
        }
      </div>
      <div aria-live="polite" aria-atomic="true">
        {state.message
          ? (
            <Typography variant="bodyMedium" color="red">
              {state.message}
            </Typography>
          )
          : null}
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
