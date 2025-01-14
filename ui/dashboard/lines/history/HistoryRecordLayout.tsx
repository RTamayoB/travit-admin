"use client";

import Header from "@/ui/sections/header";
import { Line, LineHistory } from "@/app/lib/definitions";
import { useUserContext } from "@/app/lib/UserContextProvider";
import { redirect } from "next/navigation";
import { Button, Typography } from "@/ui/components";
import styles from './historyrecordlayout.module.scss';
import HistoryRecordDetails from "./HistoryRecordDetails";
import SimpleLineView from "@/ui/dashboard/lines/simplelineview/SimpleLineView";

interface HistoryRecordLayoutProps {
  lineId: string,
  record: LineHistory
  onRestoreState: (lineId: string, record: LineHistory) => Promise<{message: string}>;
}

function HistoryRecordLayout({
  lineId,
  record,
  onRestoreState,
}: HistoryRecordLayoutProps) {
  const { role } = useUserContext();

  if (role != "admin") {
    redirect("/dashboard/lines");
  }

  const handleOnRestoreState = async () => {
    await onRestoreState(lineId, record)
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
            active: false
          },
          {
            id: 3,
            label: "Revision",
            href: `/dashboard/lines/${lineId}/history/${record.id}`,
            active: true,
          }
        ]}
      />
      <div className={styles.content}>
        <Typography variant="h6" className={styles.subtitle}>Detalles de Entrada</Typography>
        <HistoryRecordDetails record={record}/>
        <Typography variant="h6" className={styles.subtitle}>Cambios en la Linea</Typography>
        <div>
          {record.old_data && (
            <div>
              <Typography variant="subtitle">Antes</Typography>
              <SimpleLineView
                line={record.old_data as Line}
                agency={record.old_data.agency_id.toString()}
              />
            </div>
          )}
          {record.new_data && (
            <div>
              <Typography variant="subtitle">Despues</Typography>
              <SimpleLineView
                line={record.new_data as Line}
                agency={record.new_data.agency_id.toString()}
              />
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          <Button
            label="Restaurar estado"
            onClick={handleOnRestoreState}
          />
        </div>
      </div>
    </div>
  );
}

export default HistoryRecordLayout;
