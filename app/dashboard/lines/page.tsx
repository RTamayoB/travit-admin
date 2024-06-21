import {Button, Pagination, Searchbar, Typography} from "@/shared/components";
import styles from "@/app/dashboard/lines/ui/page.module.scss";
import Table from "@/shared/components/organisms/TableView/Table/Table";
import Map from "../components/Map";
import Link from "next/link";
import { fetchFilteredLines } from "./lib/get-lines-action";
import { fetchLinePages } from "./lib/get-lines-page-count-action";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchLinePages(query)
  const lines = await fetchFilteredLines(query, currentPage)

  return (
    <>
      <div>
        <Typography variant="h5" bold>
          Lineas
        </Typography>
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
        <Map position={[20.6597, 256.6500]} zoom={12}/>
      </div>
    </>
  )
}