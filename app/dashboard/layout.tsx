import styles from "@/app/dashboard/.ui/layout.module.scss";
import React from "react";
import { SideBar } from "@/shared/components/organisms/SideBar";
import {getLoggedUser} from "@/app/dashboard/data/get-logged-user";

export default async function Layout({ children }: { children: React.ReactNode}) {

    const userInfo = await getLoggedUser()

    return (
        <div className={styles.container}>
            <div >
                <SideBar
                    userInfo={userInfo}
                />
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
}
