'use client';

import styles from "../dashboard/layout.module.scss"
import React from "react";
import {fetchUserInfo} from "@/app/dashboard/actions";
import {SideBar, SideBarItemProps} from "@/shared/components/organisms/SideBar";

export default async function Layout({ children }: { children: React.ReactNode}) {

    const userInfo = await fetchUserInfo()

    const contentItems: SideBarItemProps[] = [
        {
            "label": "Rutas",
            "icon": {
                "src": "static/media/shared/assets/svg/rutas.svg",
                "height": 16,
                "width": 16,
                "blurDataURL": "static/media/shared/assets/svg/rutas.svg"
            },
            "route": "/dashboard/lines"
        },
        {
            "label": "Paradas",
            "icon": {
                "src": "static/media/shared/assets/svg/paradas.svg",
                "height": 16,
                "width": 16,
                "blurDataURL": "static/media/shared/assets/svg/paradas.svg"
            },
            "route": "/dashboard/stops"
        }
    ]

    const user: SideBarItemProps = {
        subtitle: userInfo.role,
        route: '/profile',
        isForProfile: true,
        label: userInfo.username,
        onClick: (route) => console.log(route),
    }

    // Footer Items if theres an existing user
    const footerItems: SideBarItemProps[] = [
        {
            "label": "Configuracion",
            "icon": {
                "src": "static/media/shared/assets/svg/settings.svg",
                "height": 16,
                "width": 16,
                "blurDataURL": "static/media/shared/assets/svg/settings.svg"
            },
            "route": "/settings"
        },
        {
            "label": "Salir",
            "icon": {
                "src": "static/media/shared/assets/svg/logout.svg",
                "height": 16,
                "width": 16,
                "blurDataURL": "static/media/shared/assets/svg/logout.svg"
            },
            "route": "/profile"
        }
    ]



    return (
        <div className={styles.container}>
            <div className={styles.sidenav}>
                <SideBar
                    footerItems={footerItems}
                    contentItems={contentItems}
                    user={user}
                />
            </div>
            <div className={styles.content}>{children}</div>
        </div>
        );
}