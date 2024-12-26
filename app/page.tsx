import LoginForm from "@/ui/login/LoginForm";
import styles from "./login/login.module.scss";
import { login } from "./login/data/login";

export default async function Home(
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
