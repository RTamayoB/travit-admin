"use client";

import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { Button, Logo } from "@/ui/components";
import SideBarItem, { Destination } from "./sidebaritem/SideBarItem";
import LogoutButton from "./sidebaritem/LogoutButton";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { User } from "@supabase/supabase-js";

type SidebarViewMode = "collapsable" | "expanded";

function SideBar() {
  const [sideBarViewMode, setSideBarViewMode] = useState<SidebarViewMode>(
    "expanded",
  );
  const userData = useUserContext();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [userInfo, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const sidebarState = isSideBarOpen ? "open" : "close";

  useEffect(() => {
    setUser(userData.user)
    setRole(userData.role)
  }, [userData])

  const destinations: Destination[] = [
    {
      "label": "Inicio",
      "icon": "/images/circle-dot.svg",
      "route": "/dashboard",
    },
    {
      "label": "Lineas",
      "icon": "/images/lines.svg",
      "route": "/dashboard/lines",
    },
    {
      "label": "Paradas",
      "icon": "/images/stops.svg",
      "route": "/dashboard/stops",
    },
    {
      "label": "Concesionarias",
      "icon": "/images/building-estate.svg",
      "route": "/dashboard/agencies",
    },
  ];

  const user: Destination = {
    "label": userInfo?.email!!,
    "subtitle": role!!,
    "icon": "/images/user.svg",
    "route": "/account",
  };

  const config: Destination = {
    "label": "Configuracion",
    "icon": "/images/settings.svg",
    "route": "/settings",
  };

  function toggleSidebar() {
    if (sideBarViewMode == "collapsable") {
      setSideBarViewMode("expanded");
    } else {
      setSideBarViewMode("collapsable");
    }
  }

  return (
    <nav
      onMouseEnter={() =>
        sideBarViewMode == "collapsable" && setIsSideBarOpen(true)}
      onMouseLeave={() =>
        sideBarViewMode == "collapsable" && setIsSideBarOpen(false)}
      className={`sidebar sidebar--${sidebarState}`}
    >
      {isSideBarOpen && (
        <Button
          primary={sideBarViewMode == "expanded" ? true : false}
          size="small"
          onClick={toggleSidebar}
          leadIconUrl={sideBarViewMode == "expanded"
            ? "/icons/layout-sidebar-white.svg"
            : "/icons/layout-sidebar-black.svg"}
          className="sidebar__toggleButton"
        />
      )}
      <div className="sidebar__section sidebar__section--header">
        <Logo
          variant={isSideBarOpen ? "logotype" : "isotype"}
          size={68}
        />
      </div>
      <div className="sidebar__section sidebar__section--content">
        {destinations.map((destination) => (
          <SideBarItem
            key={destination.route}
            {...destination}
            variant={sidebarState}
          />
        ))}
        {role == "admin" && (
          <SideBarItem
            label={"Cuentas"}
            icon={"/images/users-group.svg"}
            route={""}
            variant={sidebarState}
          />
        )}
      </div>
      <div className="sidebar__section sidebar__section--footer">
        <SideBarItem
          {...user}
          variant={sidebarState}
        />
        <SideBarItem
          {...config}
          variant={sidebarState}
        />
        <LogoutButton variant={sidebarState} />
      </div>
    </nav>
  );
}

export default SideBar;
