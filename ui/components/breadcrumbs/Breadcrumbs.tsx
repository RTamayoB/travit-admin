import { clsx } from "clsx";
import Link from "next/link";
import styles from "./breadcrumbs.module.scss";
import Typography from "@/ui/components/typography";

export interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav className={styles.breadcrumbs}>
      <ol className={styles.ol}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            className={clsx(
              { [styles.active]: breadcrumb.active },
            )}
          >
            {breadcrumb.active
              ? (
                <Typography variant="h5" bold>
                  {breadcrumb.label}
                </Typography>
              )
              : (
                <Link href={breadcrumb.href}>
                  <Typography variant="h5" bold>
                    {breadcrumb.label}
                  </Typography>
                </Link>
              )}
            {index < breadcrumbs.length - 1
              ? (
                <span className={styles.separator}>
                  <Typography variant="h5" bold>/</Typography>
                </span>
              )
              : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
