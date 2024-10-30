'use client';

import {Button, Pagination, Searchbar } from "@/shared/components";
import LineTable from "./LineTable";
import Link from "next/link";
import styles from "@/app/dashboard/lines/ui/page.module.scss";
import Map from "@/app/dashboard/components/Map";
import LinesDrawer from "@/app/dashboard/lines/ui/LinesDrawer";
import { Line } from "@/app/lib/definitions";
import { useState } from "react";
import Breadcrumbs from "@/ui/components/breadcrumbs";
import TableHeader from "@/ui/header/Header";
import { LinkButton } from "@/ui/components";

export default function LineView ({
        lines,
        totalPages,
}: {
        lines: Line[],
        totalPages: number,
}) {
    const [focusedLine, setFocusedLine] = useState<Line | null>(null);

    const handleFocusToggle = (line: Line) => {
      if (focusedLine && focusedLine.id === line.id) {
        setFocusedLine(null); // Unfocus
      } else {
        setFocusedLine(line); // Focus
      }
    };
    
    return (
        <>
            <TableHeader
              breadcrumbList={[{label: 'Lineas', href: '/dashboard/lines', active: true}]}
              actions={
                <LinkButton href={'/dashboard/lines/create'} label="Crear Linea +" />
              }
            />
            <div className={styles.searchbarContainer}>
                <Searchbar
                  id="table_search"
                  style={{ maxWidth: 300 }}
                  placeholder="Busca lineas..."
                  className={styles.searchbar}
                />
            </div>
            <LineTable
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
