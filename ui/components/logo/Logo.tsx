import Image from "next/image";

type LogoVariants = "logotype" | "isotype";

export interface LogoProps {
  variant: LogoVariants;
  size?: number;
  className?: string;
}

function Logo({
  variant,
  size = 24,
  className,
}: LogoProps) {
  function returnSrc(variant: LogoVariants): string {
    switch (variant) {
      case "isotype":
        return "images/logo/isotype.svg";
      case "logotype":
        return "images/logo/logotype.svg";
      default:
        return "/images/logo/logotype.svg";
    }
  }

  const logoSrc = returnSrc(variant);

  return (
    <Image
      src={logoSrc}
      alt={variant}
      width={size}
      height={size}
      className={className}
    />
  );
}

export default Logo;
