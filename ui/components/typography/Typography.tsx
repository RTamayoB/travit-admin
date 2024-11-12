import React, { CSSProperties, ReactNode } from "react";
import styles from "./typography.module.scss";

export type TextVariants =
  | "bodySmall"
  | "bodyMedium"
  | "bodyLarge"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle"
  | "note"
  | "footnote"
  | "button";

export interface TypographyProps {
  bold?: boolean;
  color?: string;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  variant?: TextVariants;
}

function Typography({
  bold = false,
  color,
  style,
  variant = "bodyMedium",
  children,
  className,
}: TypographyProps) {
  function getVariantTag(variant: TextVariants) {
    switch (variant) {
      case "bodySmall":
      case "bodyMedium":
      case "bodyLarge":
      case "subtitle":
      case "note":
      case "footnote":
      case "button":
        return "p" as keyof JSX.IntrinsicElements;
      default:
        return variant as keyof JSX.IntrinsicElements;
    }
  }

  const TypographyTag = getVariantTag(variant || "bodyMedium");

  return (
    <TypographyTag
      style={{ color, ...style }}
      className={`${styles.font} ${styles[`font--${variant}`]} ${
        bold && styles[`font--${variant}`]
      } ${className}`}
    >
      {children}
    </TypographyTag>
  );
}

export default Typography;
