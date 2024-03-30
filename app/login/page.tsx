import { login } from './actions'
import styles from '../user-form.module.scss'
import Link from 'next/link'
import Image from "next/image"
import {Button, Typography} from '@/shared/components'

export default function LoginPage() {
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
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required/>
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" required/>
                <Link href={""} className={styles.forgot}>Forgot password?</Link>
                <div className={styles.buttonContainer}>
                    <Button formAction={login} className={styles.button}>Login</Button>
                    <Typography variant="bodySmall">Don't have an account? <Link href={"/signup"} className={styles.link}>Sign up</Link></Typography>
                </div>
            </form>
        </div>
        )
}
