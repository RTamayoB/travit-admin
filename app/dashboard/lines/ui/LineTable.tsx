import { Line } from '@/app/lib/definitions';
import { deleteLine } from '@/app/dashboard/lines/[id]/edit/data/delete-line';
import Table from '@/shared/components/organisms/TableView/Table/Table';
import Image from "next/image";
import styles from '@/app/dashboard/lines/ui/line-table.module.scss';
import EditIconButton from "@/app/dashboard/components/EditIconButton";
import DeleteIconButton from "@/app/dashboard/components/DeleteIconButton";

export default function LineTable({
    lines,
    onFocusToggle,
    focusedLine
  }: {
    lines: any[],
    onFocusToggle: (line: Line) => void,
    focusedLine: Line | null
  }) {
    const renderActions = (line: Line) => (
      <div className={styles.actions}>
        <button
          onClick={() => onFocusToggle(line)}
          title="Enfocar/Desenfocar"
        >
          {
            focusedLine && focusedLine.id === line.id ?
            <Image
              src={'/images/eye-open.svg'}
              width={24}
              height={24}
              blurDataURL={'/images/eye-open.svg'}
              alt={'UnFocus'}
            /> :
            <Image
              src={'/images/eye-closed.svg'}
              width={24}
              height={24}
              blurDataURL={'/images/eye-closed.svg'}
              alt={'Focus'}
            />
          }
        </button>
        <EditIconButton href={`/dashboard/lines/${line.id}/edit`} />
        <DeleteIconButton action={() => deleteLine(line.id.toString())} />
      </div>
    );

    return (
      <Table
        data={lines}
        keysToIgnore={['route_points']}
        renderActions={renderActions}
      />
    );
  }
