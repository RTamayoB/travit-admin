'use client';

import React, { FC, useState } from 'react'
import { Logo } from '@/shared'
import { logos, sideBarVariants } from '@/shared'
import './sideBar.scss'
import { UserInfo } from '@/app/lib/definitions';
import {Destination, SingleItem} from "@/shared";
import {LogoutButton} from "@/shared/components/organisms/SideBar/LogoutButton/LogoutButton";

export interface SideBarProps {
  userInfo: UserInfo,
}

export const SideBar: FC<SideBarProps> = ({
  userInfo
  }) => {
    const [sideBarState, setSideBarState] = useState<sideBarVariants>('close')

    const destinations: Destination[] = [
      {
        "label": "Inicio",
        "icon": "/images/circle-dot.svg",
        "route": "/dashboard"
      },
      {
        "label": "Rutas",
        "icon": "/images/lines.svg",
        "route": "/dashboard/lines"
      },
      {
        "label": "Paradas",
        "icon": "/images/stops.svg",
        "route": "/dashboard/stops"
      },
      {
        "label": "Concesionarias",
        "icon": "/images/building-estate.svg",
        "route": "/dashboard/agencies"
      }
    ]

    const user: Destination = {
      "label": userInfo.username,
      "subtitle": userInfo.role,
      "icon": "/images/user.svg",
      "route": "/account"
    }

    const config: Destination = {
        "label": "Configuracion",
        "icon": "/images/settings.svg",
        "route": "/settings"
    }

    return (
      <nav
        onMouseEnter={() => setSideBarState('open')}
        onMouseLeave={() => setSideBarState('close')}
        className={`msv-sidebar msv-sidebar--${sideBarState}`}
      >
        <span className="msv-sidebar__sideIcon" />
        <div className="msv-sidebar__section msv-sidebar__section--header">
          <Logo
            width={logos[sideBarState].size}
            variant={logos[sideBarState].type}
          />
        </div>
        <div className="msv-sidebar__section msv-sidebar__section--content">
          {destinations.map((destination) => (
            <SingleItem key={destination.route} {...destination} variant={sideBarState} />
          ))}
          {userInfo.role == 'manager' && (
            <SingleItem
              label={'Cuentas'}
              icon={'/images/users-group.svg'}
              route={'/dashboard/profiles/'}
              variant={sideBarState}
            />
          )}
        </div>
        <div className="msv-sidebar__section msv-sidebar__section--footer">
          <SingleItem
            {...user}
            variant={sideBarState}
          />
          <SingleItem
            {...config}
            variant={sideBarState}
          />
          <LogoutButton variant={sideBarState} />
        </div>
      </nav>
    )
  }
