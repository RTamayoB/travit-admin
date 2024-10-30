import { login } from "./data/login";
import styles from "./login.module.scss";
import LoginForm from "@/ui/login/LoginForm";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className={styles.container}>
      <LoginForm searchParams={searchParams} onSubmit={login} />
    </div>
  );
}
