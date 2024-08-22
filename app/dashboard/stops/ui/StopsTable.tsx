'use client';

import {formatDateToLocal} from '../../../../app/lib/utils'
import { Button, LinkButton } from '../../../../shared/components/atoms';
import { deleteStop } from '../../../../app/dashboard/stops/data/delete-stop';
import Table from '@/shared/components/organisms/TableView/Table/Table';

/*export default function StopsTable ({
        stops,
        onLocateStop,
    }: {
        stops: any[],
        onLocateStop: (stop: any) => void,
}) {


    let keys: string[] = [];

    if (stops && stops.length > 0) {
        keys = Object.keys(stops[0]);
    }
    
    const renderCellValue = (key: string, value: any) => {
        if (key === 'created_at' || key === 'updated_at') {
            return formatDateToLocal(value);
        } else if (typeof value === 'object' && value !== null) {
            if (key === 'location' && value.coordinates) {
                return `${value.coordinates.join(', ')}`;
            }
            return JSON.stringify(value); // Fallback for any other objects
        }
        return value;
    };


    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha de creacion</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Posicion</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                    {stops?.map((stop) => (
                        <tr key={stop.id}>
                            {keys.map((key) => (
                                <td key={`${stop.id}-${key}`}>
                                    {renderCellValue(key, stop[key])}
                                </td>
                                ))}
                                <td>
                                    <Button
                                        onClick={() => onLocateStop(stop)}
                                    >
                                        Localizar
                                    </Button>
                                    <LinkButton label='Editar' href={`/dashboard/stops/${stop.id}/edit`}/>
                                    <Button
                                        onClick={() => deleteStop(stop.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}*/

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
