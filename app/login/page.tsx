import { login } from "./data/login";
import styles from "./login.module.scss";
import LoginForm from "@/ui/login/LoginForm";

export default async function LoginPage(
  props: {
    searchParams: Promise<{ message: string }>;
  }
) {
  const searchParams = await props.searchParams;
  return (
    <div className={styles.container}>
      <LoginForm searchParams={searchParams} onSubmit={login} />
    </div>
  );
}
