'use client';
import {Typography } from '../../../../../shared/components/atoms/Typography';
import './table.scss'
import {formatDateToLocal} from '../../../../../app/lib/utils'
import Link from 'next/link';
import { Button } from '@/shared/components/atoms/Button';

export default function StopsTable ({
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
                    {keys.map(value => (
                        <th key={value}>
                            <Typography variant="bodySmall" bold>
                                {value.toUpperCase()}
                            </Typography>
                        </th>
                        ))}
                     <th>
                         
                     </th>
                     <th>
                         Acciones
                     </th>
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
                                </td>    
                            <td>
                                <Link href={"/dashboard/lines/edit"}>Edit</Link>
                                <Link href={''}>Delete</Link>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}
