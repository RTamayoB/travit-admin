import styles from "@/app/dashboard/.ui/layout.module.scss";
import React from "react";
import SideBar from "@/ui/dashboard/sidebar";

export default async function Layout({ children }: { children: React.ReactNode}) {

    return (
        <div className={styles.container}>
            <div>
                <SideBar/>
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
