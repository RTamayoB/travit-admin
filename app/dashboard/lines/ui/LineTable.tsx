import { Line } from '@/app/lib/definitions';
import { deleteLine } from '@/app/dashboard/lines/[id]/edit/data/delete-line';
import Table from '@/shared/components/organisms/TableView/Table/Table';
import Image from "next/image";
import Link from 'next/link';
import styles from '@/app/dashboard/lines/ui/line-table.module.scss';

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
        <button onClick={() => onFocusToggle(line)}>
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
        <Link
          href={`/dashboard/lines/${line.id}/edit`}
        >
          <Image
            src={'/images/edit.svg'}
            width={24}
            height={24}
            blurDataURL={'/images/edit.svg'}
            alt={'Edit button'}
          />
        </Link>
        <button onClick={() => deleteLine(line.id.toString())}>
          <Image
            src={'/images/delete.svg'}
            width={24}
            height={24}
            blurDataURL={'/images/delete.svg'}
            alt={'Delete button'}
          />
        </button>
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
