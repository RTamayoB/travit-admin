'use client';

import {Button, Pagination, Searchbar } from "@/shared/components";
import Table from "@/shared/components/organisms/TableView/Table/Table";
import Link from "next/link";
import styles from "@/app/dashboard/lines/ui/page.module.scss";
import Map from "@/app/dashboard/components/Map";
import LinesDrawer from "@/app/dashboard/lines/ui/LinesDrawer";
import { Route } from "@/app/lib/definitions";
import { useState } from "react";

export default function LineView ({
        lines,
        totalPages,
}: {
        lines: Route[],
        totalPages: number,
}) {
    const [focusedLine, setFocusedLine] = useState<Route | null>(null);

    const handleFocusToggle = (line: Route) => {
      if (focusedLine && focusedLine.id === line.id) {
        setFocusedLine(null); // Unfocus
      } else {
        setFocusedLine(line); // Focus
      }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFocusedLine(null);
    };
    
    return (
        <>
            <div className={styles.searchbarContainer}>
                <Searchbar
                  id="table_search"
                  style={{ maxWidth: 300 }}
                  placeholder="Busca lineas..."
                  className={styles.searchbar}
                  onChange={handleSearchChange}
                />
                <Link href={'/dashboard/lines/create'} style={{textDecoration: "none"}}>
                  <Button className={styles.linkButton}>
                    Crear Linea +
                  </Button>
                </Link>
            </div>
            <Table
                lines={lines}
                onFocusToggle={handleFocusToggle}
                focusedLine={focusedLine}
            />
            <Pagination
                align={"center"}
                totalPages={totalPages}
                className="msv-tableView__pagination"
            />
            <br/>
            <Map position={[20.6597, 256.6500]} zoom={12}>
                <LinesDrawer lines={focusedLine ? [focusedLine] : lines}/>
            </Map>
        </>
    )
}
