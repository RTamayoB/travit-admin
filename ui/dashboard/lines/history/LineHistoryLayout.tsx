"use client";

import { LineHistory } from "@/app/lib/definitions";
import { LinkButton } from "@/ui/components";
import styles from "../lineslayout.module.scss";
import { Header, Pagination, SearchBar, Table } from "@/ui/sections";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { redirect } from "next/navigation";

interface LinesLayoutProps {
  lineId: number,
  history: LineHistory[];
  totalPages: number;
}

function LineHistoryLayout({
  lineId,
  history,
  totalPages,
}: LinesLayoutProps) {

  const { role } = useUserContext();
  
  if (role != "admin") {
    redirect("/dashboard/lines");
  }

  return (
    <div>
      <Header
        breadcrumbList={[
          {
            id: 1,
            label: "Lineas",
            href: "/dashboard/lines",
            active: false,
          },
          {
            id: 2,
            label: lineId.toString(),
            href: `/dashboard/lines/${lineId}/history`,
            active: true
          }
      ]}
      />
      <SearchBar
        searchPlaceholder="Buscar Lineas..."
        className={styles.searchbar}
      />
      <div className={styles.content}>
        <Table
          data={history}
          keysToIgnore={["id", "old_data", "new_data", "line_id"]}
          actions={(record) => (
            <div className={styles.actions}>
              <LinkButton
                href={`/dashboard/lines/${lineId}/history/${record.id}`}
                primary={false}
                leadIconUrl="/icons/clipboard-check.svg"
              />
            </div>
          )}
        />
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

export default LineHistoryLayout;
