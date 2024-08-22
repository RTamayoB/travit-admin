'use client';

import { Button, LinkButton } from '@/shared';
import { deleteStop } from '@/app/dashboard/stops/data/delete-stop';
import Table from '@/shared/components/organisms/TableView/Table/Table';

export default function StopsTable({
        stops,
        onLocateStop
      }: {
        stops: any[],
        onLocateStop: (stop: any) => void
      }) {
        const renderActions = (stop: any) => (
          <>
            <Button onClick={() => onLocateStop(stop)}>Localizar</Button>
            <LinkButton label='Editar' href={`/dashboard/stops/${stop.id}/edit`} />
            <Button onClick={() => deleteStop(stop.id)}>Eliminar</Button>
          </>
        );
      
        const customRenderCell = (key: string, value: any) => {
          if (key === 'location' && value.coordinates) {
            return `${value.coordinates.join(', ')}`;
          }
          return undefined; // Fallback to default rendering
        };
      
        return (
          <Table
            data={stops}
            renderActions={renderActions}
            keysToIgnore={['position']}
          />
        );
      }
