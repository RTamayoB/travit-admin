import React from "react";
import Image from "next/image";
import "../sidebaritem/sideBarItem.scss";
import Typography from "@/ui/components/typography";

interface LogoutButtonProps {
  variant?: string;
}

function LogoutButton({
  variant,
}: LogoutButtonProps) {
  return (
    <form
      action="auth/signout"
      method="post"
    >
      <button
        type="submit"
        className={`sideBarItem sideBarItem--${variant}`}
      >
        <Image
          src={"/images/logout.svg"}
          width={16}
          height={16}
          blurDataURL={"/images/logout.svg"}
          alt={"Logout option"}
        />
        <div>
          <Typography variant="bodySmall" bold color="#434343">
            Salir
          </Typography>
        </div>
      </button>
    </form>
  );
}

export default LogoutButton;
