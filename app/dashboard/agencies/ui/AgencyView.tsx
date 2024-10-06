'use client';

import {Button, Pagination, Searchbar } from "@/shared/components";
import Link from "next/link";
import styles from "@/app/dashboard/agencies/ui/page.module.scss";
import {Agencies} from "@/app/lib/definitions";
import Breadcrumbs from "@/app/dashboard/.ui/breadcrumbs";
import AgencyTable from "@/app/dashboard/agencies/ui/AgencyTable";

export default function AgencyView ({
        agencies,
        totalPages,
}: {
        agencies: Agencies[],
        totalPages: number,
}) {

    return (
        <>
            <div className={styles.header}>
                <Breadcrumbs breadcrumbs={[{label: 'Concesionarias', href: '/dashboard/agencies', active: true}]}/>
                <Link href={'/dashboard/agencies/create'} style={{textDecoration: "none"}}>
                    <Button className={styles.linkButton}>
                      Crear Concesionaria +
                    </Button>
                  </Link>
            </div>
            <div className={styles.searchbarContainer}>
                <Searchbar
                  id="table_search"
                  style={{ maxWidth: 300 }}
                  placeholder="Busca concesionarias..."
                  className={styles.searchbar}
                />
            </div>
            <AgencyTable
                agencies={agencies}
            />
            <Pagination
                align={"center"}
                totalPages={totalPages}
                className="msv-tableView__pagination"
            />
        </>
    )
}