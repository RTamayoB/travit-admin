import { sendPasswordResetEmail } from './data/reset-password';
import styles from '../user-form.module.scss';
import {Button, Logo} from '@/shared/components';

export default function Page() {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.logo}>
                    <Logo
                        width={67}
                        variant={'logo'}
                        />
                </div>
                <label htmlFor="email">Ingresa tu correo electronico, si existe, recibiras un correo para actualizar tu contraseña:</label>
                <input id="recoverEmail" name="recoverEmail" type="email" required/>
                <div className={styles.buttonContainer}>
                    <Button formAction={sendPasswordResetEmail} className={styles.button}>Enviar correo</Button>
                </div>
            </form>
        </div>
        )
}
