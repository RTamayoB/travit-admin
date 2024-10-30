import React from "react";
import Image from "next/image";
import "./sideBarItem.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Typography from "@/ui/components/typography";

export interface Destination {
  icon: string;
  label: string;
  route: string;
  subtitle?: string;
  variant?: string;
}

function SideBarItem({
  icon,
  label,
  route,
  subtitle,
  variant,
}: Destination) {
  const currentPath = usePathname();

  const isActive = currentPath === route;

  return (
    <Link
      href={route}
      style={{ textDecoration: "none" }}
    >
      <button
        className={`sideBarItem sideBarItem--${variant} sideBarItem--${
          isActive ? "focus" : ""
        }`}
      >
        <Image
          src={icon}
          width={24}
          height={24}
          blurDataURL={icon}
          alt={label ?? "SideBar Option"}
        />
        <div>
          {label && (
            <Typography variant="bodySmall" bold color="#434343">
              {label}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="note" bold color="#999999">
              {subtitle}
            </Typography>
          )}
        </div>
      </button>
    </Link>
  );
}

export default SideBarItem;
