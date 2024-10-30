import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import styles from "./linkbutton.module.scss";
import Typography from "../typography";
import Image from "next/image";

interface LinkButtonProps {
  label?: string;
  href: Url;
  leadIconUrl?: string;
  trailIconUrl?: string;
}

function LinkButton({
  label,
  href,
  leadIconUrl,
  trailIconUrl,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={styles.linkbutton}
    >
      {leadIconUrl && (
        <Image
          src={leadIconUrl}
          alt=""
          width={24}
          height={24}
          className={styles["linkbutton--icon-left"]}
        />
      )}
      {label && (
            <Typography variant="button">
              {label}
            </Typography>
      )}
      {trailIconUrl && (
        <Image
          src={trailIconUrl}
          alt=""
          width={24}
          height={24}
          className={styles["linkbutton--icon-right"]}
        />
      )}
    </Link>
  );
}

export default LinkButton;
