import SideNav from "@/app/ui/sidenav";
import styles from "../dashboard/layout.module.scss"
import React from "react";

export default function Layout({ children }: { children: React.ReactNode}) {
    return (
        <div className={styles.container}>
            <div className={styles.sidenav}>
                <SideNav />
            </div>
            <div className={styles.content}>{children}</div>
        </div>
        );
}