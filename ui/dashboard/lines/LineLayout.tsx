import { Line } from "@/app/lib/definitions";
import { LinkButton } from "@/ui/components";
import Header from "@/ui/sections/header";
import SearchBar from "@/ui/sections/searchbar";
import Table from "@/ui/sections/table";
import Pagination from "@/ui/sections/pagination";
import styles from './linelayout.module.scss';
import Map from "@/app/dashboard/components/Map";

interface LineLayoutProps {
  lines: Line[]
  totalPages: number
}

function LineLayout({
  lines,
  totalPages
}: LineLayoutProps) {
  return (
    <div>
      <Header
        breadcrumbList={[{label: 'Lineas', href: '/dashboard/lines', active: true}]}
        actions={
          <LinkButton href={'/dashboard/lines/create'} label="Crear Linea +"/>
        }
      />
      <SearchBar
        searchPlaceholder="Buscar Lineas..."
      />
      <div className={styles.content}>
        <Table
        data={lines}
        keysToIgnore={["agency_id", "route_points"]}
        />
        <Map position={[20.6597, 256.6500]} zoom={12} />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default LineLayout;