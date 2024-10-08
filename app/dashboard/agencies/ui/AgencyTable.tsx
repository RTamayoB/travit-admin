import { Agencies } from '@/app/lib/definitions';
import Table from '@/shared/components/organisms/TableView/Table/Table';
import Image from "next/image";
import Link from 'next/link';
import styles from '@/app/dashboard/lines/ui/line-table.module.scss';
import { deleteAgency } from '../data/delete-agency';
import EditIconButton from '../../components/EditIconButton';
import DeleteIconButton from '../../components/DeleteIconButton';

export default function AgencyTable({
    agencies,
  }: {
    agencies: any[],
  }) {
    const renderActions = (agency: Agencies) => (
      <div className={styles.actions}>
        <EditIconButton href={`/dashboard/agencies/${agency.id}/edit`} />
        <DeleteIconButton action={() => deleteAgency(agency.id.toString())} />
      </div>
    );

    return (
      <Table
        data={agencies}
        renderActions={renderActions}
      />
    );
  }
