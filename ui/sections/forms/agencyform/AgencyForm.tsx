import { Agency, AgencyState } from "@/app/lib/definitions";
import styles from "../form.module.scss";
import { Button, LinkButton, TextField, Typography } from "@/ui/components";

interface AgencyFormProps {
  agency?: Agency;
  onSubmit: (formData: FormData) => void;
  state: AgencyState;
  submitButtonText: string;
}

function AgencyForm({
  agency = {
    id: 0,
    name: "",
  },
  onSubmit,
  state,
  submitButtonText,
}: AgencyFormProps) {
  return (
    <form className={styles.form} action={onSubmit}>
      <div className={styles.fieldsContainer}>
        <TextField
          id="name"
          name="name"
          label="Nombre de la concesionaria"
          value={agency.name}
          className={styles["fieldsContainer--field"]}
        />
        <div id="name" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <Typography variant="bodySmall" color="red" key={error}>
                {error}
              </Typography>
            ))}
        </div>
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
          href={"/dashboard/agencies"}
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

export default AgencyForm;
