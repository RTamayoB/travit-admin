import { Agencies } from '@/app/lib/definitions';
import Table from '@/shared/components/organisms/TableView/Table/Table';
import Image from "next/image";
import Link from 'next/link';
import styles from '@/app/dashboard/lines/ui/line-table.module.scss';
import { deleteAgency } from '../data/delete-agency';

export default function AgencyTable({
    agencies,
  }: {
    agencies: any[],
  }) {
    const renderActions = (agency: Agencies) => (
      <div className={styles.actions}>
        <Link
          href={`/dashboard/agencies/${agency.id}/edit`}
        >
          <Image
            src={'/images/edit.svg'}
            width={24}
            height={24}
            blurDataURL={'/images/edit.svg'}
            alt={'Edit button'}
          />
        </Link>
        <button onClick={() => deleteAgency(agency.id.toString())}>
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
        data={agencies}
        renderActions={renderActions}
      />
    );
  }
