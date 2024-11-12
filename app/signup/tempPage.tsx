import { signup } from './data/signup';
import styles from '../user-form.module.scss';
import Image from "next/image";
import Link from "next/link";
import { Button, Typography } from '@/ui/components';

export default function SignUpPage({
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
                <Typography variant="h1" className={styles.title}>Signup</Typography>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required/>
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required/>
                <div className={styles.buttonContainer}>
                    <Button formAction={signup} className={styles.button} label='Sign up'/>
                    <Typography variant="bodySmall">Already have an account? <Link href={"/login"} className={styles.link}>Login</Link></Typography>
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
