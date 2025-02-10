"use client";

import { Stop, StopState } from "@/app/lib/definitions";
import { Button, TextField, Typography } from "@/ui/components";
import { LatLng } from "leaflet";
import styles from "./stopform.module.scss";

interface StopFormProps {
  stop?: Stop;
  position: LatLng;
  state: StopState;
  submitButtonText: string;
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  onLocateStop: () => void;
}

function StopForm({
  stop = {
    id: 1,
    name: "",
    description: "",
    position: { lat: 0, lng: 0 },
  },
  position,
  state,
  submitButtonText,
  onSubmit,
  onCancel,
  onLocateStop,
}: StopFormProps) {
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
        <input type="hidden" name="lat" value={position.lat} />
        <input type="hidden" name="lng" value={position.lng} />
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
        <Button
          primary={false}
          label="Localizar"
          onClick={onLocateStop}
          type="button"
        />
        <Button
          primary={false}
          label="Cancelar"
          onClick={onCancel}
          type="button"
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
