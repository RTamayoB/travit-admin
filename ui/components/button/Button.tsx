import styles from "./button.module.scss";
import { ButtonHTMLAttributes } from "react";
import Image from "next/image";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  primary?: boolean;
  size?: "small" | "medium" | "large";
  leadIconUrl?: string;
  trailIconUrl?: string;
}

function Button({
  label,
  primary = true,
  size = "medium",
  leadIconUrl,
  trailIconUrl,
  ...props
}: ButtonProps) {
  const buttonClass = `${styles.button} ${
    styles[`button--${primary ? "primary" : "secondary"}`]
  } ${styles[`button--${size}`]}`;

  return (
    <button
      className={buttonClass}
      {...props}
    >
      {leadIconUrl && (
        <Image src={leadIconUrl} alt="" width={24} height={24} />
      )}
      {label}
      {trailIconUrl && (
        <Image src={trailIconUrl} alt="" width={24} height={24} />
      )}
    </button>
  );
}

export default Button;
