import './table.scss';
import {Button, LinkButton, Typography } from '../../../../../shared/components/atoms';
import { Line } from '@/app/lib/definitions';
import { formatDateToLocal } from '../../../../../app/lib/utils';
import { deleteLine } from '../../../../../app/dashboard/lines/[id]/edit/data/delete-line';

export default function Table({
  lines,
  onFocusToggle,
  focusedLine
}: {
  lines: any[],
  onFocusToggle: (line: Line) => void,
  focusedLine: Line | null
}) {
  let keys: string[] = [];

  if (lines && lines.length > 0) {
    keys = Object.keys(lines[0]).filter(key => key !== 'route_points');
  }

  const renderCellValue = (key: string, value: any) => {
    if (key === "created_at" || key === "updated_at") {
      return formatDateToLocal(value);
    } else if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    } else {
      return value;
    }
  };

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
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {lines?.map((line) => (
          <tr key={line.id}>
            {keys.map((key) => (
              <td key={`${line.id}-${key}`}>
                {renderCellValue(key, line[key])}
              </td>
            ))}
            <td>
              <Button onClick={() => onFocusToggle(line)}>
                {focusedLine && focusedLine.id === line.id ? 'Unfocus' : 'Focus'}
              </Button>
              <LinkButton label='Editar' href={`/dashboard/lines/${line.id}/edit`}/>
              <Button
                onClick={() => deleteLine(line.id)}
              >
                  Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
