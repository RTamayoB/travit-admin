import { clsx } from "clsx";
import Link from "next/link";
import styles from "./breadcrumbs.module.scss";
import Typography from "@/ui/components/typography";

export interface BreadcrumbItem {
  id: number;
  label: string;
  href?: string;
  active?: boolean;
}

function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbItem[];
}) {
  return (
    <nav className={styles.breadcrumbs}>
      <ol className={styles.ol}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.id}
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
                <Link href={breadcrumb.href || ""}>
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
