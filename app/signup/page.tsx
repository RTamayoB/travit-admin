import { signup } from './actions'
import { Button } from '@/shared/components'
import styles from './page.module.scss'
import {border} from "polished";

export default function SignUpPage() {
    return (
        <form className={styles.form}>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <input id="email" name="email" type="email" required className={styles.input}/>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <input id="password" name="password" type="password" required className={styles.input}/>
            <div className={styles.buttons}>
                <Button formAction={signup}>Login</Button>
            </div>
        </form>
        )
}
