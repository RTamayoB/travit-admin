"use client";

import { Stop, StopState } from "@/app/lib/definitions";
import { Button, LinkButton, TextField, Typography } from "@/ui/components";
import { useState } from "react";
import { LatLng } from "leaflet";
import styles from "../form.module.scss";
import dynamic from "next/dynamic";

const StopEditMap = dynamic(() => import('@/ui/sections/maps/stopeditmap/StopEditMap'), { ssr: false })

interface StopFormProps {
  stop?: Stop;
  onSubmit: (formData: FormData) => void;
  state: StopState;
  submitButtonText: string;
}

function StopForm({
  stop = {
    id: 1,
    name: "",
    description: "",
    position: { lat: 0, lng: 0 },
  },
  onSubmit,
  state,
  submitButtonText,
}: StopFormProps) {
  const [marker, setMarker] = useState<LatLng | null>(
    new LatLng(stop.position.lat, stop.position.lng),
  );

  const handleSetMarker = (marker: LatLng) => {
    setMarker(marker);
  };

  return (
    <form action={onSubmit}>
      <div className={styles.fieldsContainer}>
        <TextField
          id="name"
          name="name"
          label="Nombre de la parada"
          value={stop.name}
          className={styles["fieldsContainer--fields"]}
        />
        <div id="name" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <Typography variant="bodySmall" color="red" key={error}>
                {error}
              </Typography>
            ))}
        </div>
        <TextField
          id="description"
          name="description"
          label="Descripcion de la parada"
          value={stop.description}
          className={styles["fieldsContainer--fields"]}
        />
        <div id="description" aria-live="polite" aria-atomic="true">
          {state.errors?.description &&
            state.errors.description.map((error: string) => (
              <Typography variant="bodySmall" color="red" key={error}>
                {error}
              </Typography>
            ))}
        </div>
        <input type="hidden" name="lat" value={marker?.lat} />
        <input type="hidden" name="lng" value={marker?.lng} />
        <StopEditMap
          marker={marker}
          onSetMarker={handleSetMarker}
        />
        <Typography variant={"note"}>
          Haz click derecho en cualquier lugar del mapa para colocar un
          marcador.
        </Typography>
        <Typography variant={"note"}>
          Para moverlo, arrastralo o haz click derecho de nuevo para cambiar su
          posición.
        </Typography>
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
          href={"/dashboard/stops"}
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

export default StopForm;
