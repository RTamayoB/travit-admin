import Link from "next/link";
import { Button, Logo, TextField, Typography } from "../components";
import styles from "./loginform.module.scss";

interface LoginFormProps {
  searchParams?: { message: string };
  onSubmit: (e: FormData) => void;
}

function LoginForm({
  searchParams,
  onSubmit,
}: LoginFormProps) {
  return (
    <form className={styles.form}>
      <Logo
        variant="logotype"
        size={136}
        className={styles["form--logo"]}
      />
      <Typography variant="h5" className={styles["form--title"]}>
        Bienvenido de vuelta
      </Typography>
      <TextField
        id="email"
        name="email"
        type="email"
        label="Correo electronico"
        leadIconUrl="/icons/mail.svg"
        size="large"
        required
        className={styles.field}
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label="Contraseña"
        leadIconUrl="/icons/lock.svg"
        textSize="large"
        required
        className={styles.field}
      />
      <Link href={""} className={styles["form--link"]}>
        Olvidaste la contraseña?
      </Link>
      <Button
        label="Login"
        formAction={onSubmit}
        size="large"
        className={styles["form--button"]}
      />
      <Typography
        variant="bodySmall"
        className={styles["form--link"]}
      >
        No tienes una cuenta? <Link href={"/signup"}>Registrate</Link>
      </Typography>
      {searchParams?.message && (
        <Typography variant="note">
          {searchParams.message}
        </Typography>
      )}
    </form>
  );
}

export default LoginForm;
