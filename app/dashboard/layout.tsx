import styles from "../dashboard/layout.module.scss"
import React from "react";
import SideNav from "../ui/dashboard/sidenav";

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