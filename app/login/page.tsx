import { login } from './data/login';
import styles from '../user-form.module.scss';
import Link from 'next/link';
import Image from "next/image";
import {Button, Typography} from '@/shared/components';

export default function LoginPage({
    searchParams
}: {
    searchParams: { message: string }
}) {
    return (
        <div className={styles.container}>
            <Image
                className={styles.background}
                alt="Login background"
                src="/images/guadalajara_background.jpeg"
                width={3000}
                height={2000}
            />
            <form className={styles.form}>
                <Typography variant="h1" className={styles.title}>Login</Typography>
                <label htmlFor="email">Correo:</label>
                <input id="email" name="email" type="email" required/>
                <label htmlFor="password">Contraseña:</label>
                <input id="password" name="password" type="password" required/>
                <Link href={"/forgot-password/"} className={styles.forgot}>Olvidaste la contraseña?</Link>
                <div className={styles.buttonContainer}>
                    <Button formAction={login} className={styles.button}>Login</Button>
                    <Typography variant="bodySmall">No tienes una cuenta? <Link href={"/signup"} className={styles.link}>Registrate</Link></Typography>
                </div>
            </form>
            {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                    {searchParams.message}
                </p>
            )}
        </div>
        )
}
