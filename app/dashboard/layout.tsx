'use client';

import styles from "@/app/dashboard/.ui/layout.module.scss";
import React, { useEffect } from "react";
import SideBar from "@/ui/dashboard/sidebar";
import { useUserContext } from "../lib/UserContextProvider";

export default function Layout({ children }: { children: React.ReactNode}) {

    const { refreshUser } = useUserContext();

    useEffect(() => {
        console.log("Called refresh")
        refreshUser();
    }, []);

    return (
        <div className={styles.container}>
            <div>
                <SideBar/>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
