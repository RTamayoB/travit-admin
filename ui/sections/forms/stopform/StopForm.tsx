"use client";

import { Stop } from "@/app/lib/definitions";
import { Button, LinkButton, TextField, Typography } from "@/ui/components";
import StopEditMap from "../../maps/stopeditmap";
import { useState } from "react";
import { LatLng } from "leaflet";
import styles from "../form.module.scss";

interface StopFormProps {
  stop?: Stop;
  onSubmit: (formData: FormData) => Promise<void>;
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
          label="Nombre de la parada"
          value={stop.name}
          className={styles["fieldsContainer--fields"]}
        />
        <TextField
          id="description"
          label="Descripcion de la parada"
          value={stop.description}
          className={styles["fieldsContainer--fields"]}
        />
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
