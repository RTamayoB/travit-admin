import styles from "../dashboard/layout.module.scss"
import React from "react";
import {fetchUserInfo} from "@/app/dashboard/actions";
import { SideBar } from "@/shared/components/organisms/SideBar";

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
