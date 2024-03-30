import { signup } from './actions'
import { Button, Typography } from "@/shared/components";
import styles from '../user-form.module.scss'
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
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
                    <Button formAction={signup} className={styles.button}>Sign Up</Button>
                    <Typography variant="bodySmall">Already have an account? <Link href={"/login"} className={styles.link}>Login</Link></Typography>
                </div>
            </form>
        </div>
        )
}
