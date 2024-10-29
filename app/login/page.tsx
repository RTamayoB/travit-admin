"use client";

import { login } from "./data/login";
import styles from "../user-form.module.scss";
import Link from "next/link";
import Typography from "@/ui/components/typography";
import TextField from "@/ui/components/textfield";
import Button from "@/ui/components/button";
import Logo from "@/ui/components/logo";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className={styles.container}>
      <form className={styles["container--form"]}>
        <Logo
          variant="logotype"
          size={136}
          className={styles["container--form--logo"]}
        />
        <Typography variant="h5" className={styles["container--form--title"]}>
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
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Contraseña"
          leadIconUrl="/icons/lock.svg"
          size="large"
          required
        />
        <Link href={""} className={styles["container--form--link"]}>
          Olvidaste la contraseña?
        </Link>
        <Button
          label="Login"
          formAction={login}
          size="large"
          className={styles["container--form--button"]}
        />
        <Typography
          variant="bodySmall"
          className={styles["container--form--link"]}
        >
          No tienes una cuenta? <Link href={"/signup"}>Registrate</Link>
        </Typography>
      </form>
      {searchParams?.message && (
        <p>
          {searchParams.message}
        </p>
      )}
    </div>
  );
}
