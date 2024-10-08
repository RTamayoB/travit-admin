'use client';

import styles from '@/app/dashboard/stops/ui/page.module.scss';
import { Pagination } from "@/shared/components/organisms/Pagination";
import StopsTable from "./StopsTable";
import Map from "@/app/dashboard/components/Map";
import { useState } from "react";
import { Stop } from "@/app/lib/definitions";
import { Searchbar } from '@/shared/components/molecules';
import Link from 'next/link';
import { Button, Typography } from '@/shared/components/atoms';
import StopsController from "@/app/dashboard/stops/ui/StopsController";
import Breadcrumbs from "@/app/dashboard/.ui/breadcrumbs";

export default function StopView ({
        stops,
        totalPages,
}: {
        stops: Stop[],
        totalPages: number,
}) {
    
    const [selectedStop, setSelectedStop] = useState<Stop | null>(null)
    
    const handleSelectStop = (stop: Stop) => {
        setSelectedStop(stop);
    };
    
    return (
        <>
            <div className={styles.header}>
                <Breadcrumbs breadcrumbs={[{label: 'Paradas', href: '/dashboard/stops', active: true}]}/>
                <Link href={'/dashboard/stops/create'} style={{textDecoration: "none"}} className={styles.linkButton}>
                    <Button>
                        Crear Parada +
                    </Button>
                </Link>
            </div>
            <div className={styles.searchbarContainer}>
                <Searchbar
                    id="table_search"
                    style={{ maxWidth: 300 }}
                    placeholder="Busca paradas..."
                    className={styles.searchbar}
                />
            </div>
            <StopsTable
                stops={stops}
                onLocateStop={handleSelectStop}
            />
            <Pagination
                align={"center"}
                totalPages={totalPages}
                className="msv-tableView__pagination"
            />
            <Map position={[20.6597, 256.6500]} zoom={12}>
                <StopsController
                    initialStops={stops}
                    selectedStop={selectedStop}
                />
            </Map>
        </>
    )
}
