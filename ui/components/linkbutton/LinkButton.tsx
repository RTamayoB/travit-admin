import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import styles from "./linkbutton.module.scss";
import Typography from "../typography";
import Image from "next/image";

interface LinkButtonProps {
  label?: string;
  primary?: boolean;
  size?: "small" | "medium" | "large";
  href: Url;
  disabled?: boolean;
  leadIconUrl?: string;
  trailIconUrl?: string;
}

function LinkButton({
  label,
  primary = true,
  size = "medium",
  href,
  disabled = false,
  leadIconUrl,
  trailIconUrl,
}: LinkButtonProps) {
  const linkButtonClass = `${styles.linkbutton} ${
    styles[`linkbutton--${primary ? "primary" : "secondary"}`]
  } ${styles[`linkbutton--${size}`]} ${
    styles[`linkbutton--${disabled ? "disabled" : "enabled"}`]
  }`;

  return (
    <Link
      href={href}
      aria-disabled={disabled}
      className={`${linkButtonClass}`}
    >
      {leadIconUrl && (
        <Image
          src={leadIconUrl}
          alt=""
          width={24}
          height={24}
          className={`${label && styles.iconleft}`}
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
          className={`${label && styles.iconright}`}
        />
      )}
    </Link>
  );
}

export default LinkButton;
