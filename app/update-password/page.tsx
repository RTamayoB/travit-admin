import { updatePassword } from './data/update-password'
import styles from '../user-form.module.scss'
import { Button, Logo } from '@/ui/components'

export default function Page({
        searchParams,
}: {
    searchParams: { code: string}
})  {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <Logo
                    className={styles.logo}
                    variant={'logotype'}
                    />
                <input type="hidden" name="code" value={searchParams.code} />
                <label htmlFor="update">Actualize su contrasena.</label>
                <label htmlFor="password">Contrasena:</label>
                <input id="password" name="password" type="password" required/>
                <div className={styles.buttonContainer}>
                    <Button formAction={updatePassword} className={styles.button} label='Actualizar contraseña'></Button>
                </div>
            </form>
        </div>
        )
}
