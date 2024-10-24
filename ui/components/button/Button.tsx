import styles from "./button.module.scss";
import { ButtonHTMLAttributes } from "react";
import Image from "next/image";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  primary?: boolean;
  size?: "small" | "medium" | "large";
  leadingIconSrc?: string;
  trailingIconSrc?: string;
}

function Button({
  text,
  primary = true,
  size = "medium",
  leadingIconSrc,
  trailingIconSrc,
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
      {leadingIconSrc && (
        <Image src={leadingIconSrc} alt="" width={24} height={24} />
      )}
      {text}
      {trailingIconSrc && (
        <Image src={trailingIconSrc} alt="" width={24} height={24} />
      )}
    </button>
  );
}

export default Button;
