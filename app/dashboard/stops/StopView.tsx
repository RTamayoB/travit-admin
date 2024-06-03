'use client';

import styles from './page.module.scss'
import { Pagination } from "@/shared/components/organisms/Pagination";
import StopsTable from "@/shared/components/organisms/TableView/Table/StopsTable";
import Map from "../components/Map"
import StopsController from '../components/StopsController';
import { useState } from "react";
import { Stop } from "@/app/lib/definitions";
import { Searchbar } from '@/shared/components/molecules';
import Link from 'next/link';
import { Button } from '@/shared/components/atoms';

export default function StopView ({
        stops,
        totalPages,
}: {
        stops: any[],
        totalPages: number,
}) {
    
    const [selectedStop, setSelectedStop] = useState<Stop | null>(null)
    
    const handleSelectStop = (stop: Stop) => {
        setSelectedStop(stop);
    };
    
    return (
        <>
            <div className={styles.searchbarContainer}>
                <Searchbar
                    id="table_search"
                    style={{ maxWidth: 300 }}
                    placeholder="Busca lineas..."
                    className={styles.searchbar}
                />
                <Link href={'/dashboard/lines/create'} style={{textDecoration: "none"}} className={styles.linkButton}>
                    <Button>
                        Crear Linea +
                    </Button>
                </Link>
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