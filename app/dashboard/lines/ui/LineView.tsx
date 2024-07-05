'use client';

import {Button, Pagination, Searchbar } from "@/shared/components";
import Table from "@/shared/components/organisms/TableView/Table/Table";
import Link from "next/link";
import styles from "@/app/dashboard/lines/ui/page.module.scss";
import Map from "@/app/dashboard/components/Map";
import { Route } from "../test-page/lib/new-definitions";
import LinesDrawer from "@/app/dashboard/lines/ui/LinesDrawer";

export default function LineView ({
        lines,
        totalPages,
}: {
        lines: Route[],
        totalPages: number,
}) {
    
    return (
        <>
            <div className={styles.searchbarContainer}>
                <Searchbar
                  id="table_search"
                  style={{ maxWidth: 300 }}
                  placeholder="Busca lineas..."
                  className={styles.searchbar}
                />
                <Link href={'/dashboard/lines/create'} style={{textDecoration: "none"}}>
                  <Button className={styles.linkButton}>
                    Crear Linea +
                  </Button>
                </Link>
            </div>
            <Table
                lines={lines}
            />
            <Pagination
                align={"center"}
                totalPages={totalPages}
                className="msv-tableView__pagination"
            />
            <br/>
            <Map position={[20.6597, 256.6500]} zoom={12}>
                <LinesDrawer lines={lines}/>
            </Map>
        </>
    )
}