import styles from "./button.module.scss";
import { ButtonHTMLAttributes } from "react";
import Image from "next/image";
import Typography from "../typography";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  primary?: boolean;
  size?: "small" | "medium" | "large";
  leadIconUrl?: string;
  trailIconUrl?: string;
  className?: string;
}

function Button({
  label,
  primary = true,
  size = "medium",
  leadIconUrl,
  trailIconUrl,
  className,
  ...props
}: ButtonProps) {
  const buttonClass = `${styles.button} ${
    styles[`button--${primary ? "primary" : "secondary"}`]
  } ${styles[`button--${size}`]} ${className || ""}`;

  return (
    <button
      className={buttonClass}
      {...props}
    >
      {leadIconUrl &&
        (
          <Image
            src={leadIconUrl}
            alt=""
            width={24}
            height={24}
            className={styles.iconleft}
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
          className={styles.iconright}
        />
      )}
    </button>
  );
}

export default Button;
