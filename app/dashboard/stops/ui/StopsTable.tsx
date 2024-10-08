'use client';

import { deleteStop } from '@/app/dashboard/stops/data/delete-stop';
import Table from '@/shared/components/organisms/TableView/Table/Table';
import Image from "next/image";
import styles from '@/app/dashboard/stops/ui/stop-table.module.scss';
import EditIconButton from '../../components/EditIconButton';
import DeleteIconButton from '../../components/DeleteIconButton';

export default function StopsTable({
        stops,
        onLocateStop
      }: {
        stops: any[],
        onLocateStop: (stop: any) => void
      }) {
        const renderActions = (stop: any) => (
          <div className={styles.actions}>
            <button
              onClick={() => onLocateStop(stop)}
              title="Ver parada"
            >
              <Image
                src={'/images/map-pin.svg'}
                width={24}
                height={24}
                blurDataURL={'/images/map-pin.svg'}
                alt={'Locate stop'}
              />
            </button>
            <EditIconButton href={`/dashboard/stops/${stop.id}/edit`} />
            <DeleteIconButton action={() => deleteStop(stop.id)} />
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
