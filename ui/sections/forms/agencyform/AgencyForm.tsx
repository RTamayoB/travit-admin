import { Agency } from "@/app/lib/definitions";
import styles from "../form.module.scss";
import { Button, LinkButton, TextField } from "@/ui/components";

interface AgencyFormProps {
  agency?: Agency;
  onSubmit: (formData: FormData) => Promise<void>;
  submitButtonText: string;
}

function AgencyForm({
  agency = {
    id: 0,
    name: "",
  },
  onSubmit,
  submitButtonText,
}: AgencyFormProps) {
  return (
    <form className={styles.form} action={onSubmit}>
      <div className={styles.fieldsContainer}>
        <TextField
          id="name"
          label="Nombre de la concesionaria"
          value={agency.name}
          className={styles["fieldsContainer--field"]}
        />
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
