'use client';
import {Typography } from '../../../../../shared/components/atoms/Typography';
import './table.scss'
import {formatDateToLocal} from '../../../../../app/lib/utils'
import Link from 'next/link';

export default function Table ({
  lines
}: {
  lines: any[]
}) {


  let keys: string[] = [];

  if (lines && lines.length > 0) {
    keys = Object.keys(lines[0]);
  }


  return (
    <table className="table">
      <thead>
        <tr>
          {keys.map(value => (
            <th key={value}>
              <Typography variant="bodySmall" bold>
                {value}
              </Typography>
            </th>
            ))}
          <th>

          </th>
        </tr>
      </thead>
      <tbody>
          {lines?.map((line) => (
            <tr key={line.id}>
              {keys.map((key) => (
                <td key={`${line.id}-${key}`}>
                  {key === "created_at" || key === "updated_at"
                  ? formatDateToLocal(line[key])
                  : line[key]}
                </td>
                ))}
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
