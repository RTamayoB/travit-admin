'use client';

import { deleteStop } from '@/app/dashboard/stops/data/delete-stop';
import Table from '@/shared/components/organisms/TableView/Table/Table';
import Link from 'next/link';
import Image from "next/image";
import styles from '@/app/dashboard/stops/ui/stop-table.module.scss';

export default function StopsTable({
        stops,
        onLocateStop
      }: {
        stops: any[],
        onLocateStop: (stop: any) => void
      }) {
        const renderActions = (stop: any) => (
          <div className={styles.actions}>
            <button onClick={() => onLocateStop(stop)}>
              <Image
                src={'/images/map-pin.svg'}
                width={24}
                height={24}
                blurDataURL={'/images/map-pin.svg'}
                alt={'Locate stop'}
              />
            </button>
            <Link
              href={`/dashboard/stops/${stop.id}/edit`}
            >
              <Image
                src={'/images/edit.svg'}
                width={24}
                height={24}
                blurDataURL={'/images/edit.svg'}
                alt={'Edit button'}
              />
            </Link>
            <button onClick={() => deleteStop(stop.id)}>
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
            data={stops}
            renderActions={renderActions}
            keysToIgnore={['position']}
          />
        );
      }
