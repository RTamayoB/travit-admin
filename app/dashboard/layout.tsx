import styles from "@/app/dashboard/.ui/layout.module.scss";
import React from "react";
import { SideBar } from "@/shared/components/organisms/SideBar";
import {fetchUserInfo} from "@/app/dashboard/.lib/get-user-action";

export default async function Layout({ children }: { children: React.ReactNode}) {

    const userInfo = await fetchUserInfo()

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
