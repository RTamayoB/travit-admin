import { formatDateToLocal } from '../../../../../app/lib/utils';
import './table.scss';

export default function Table({
  data,
  keysToIgnore = [],
  renderActions,
  customRenderCell
}: {
  data: any[],
  keysToIgnore?: string[],
  renderActions: (item: any) => JSX.Element,
  customRenderCell?: (key: string, value: any) => any,
}) {
  let keys: string[] = [];

  if (data && data.length > 0) {
    keys = Object.keys(data[0]).filter(key => !keysToIgnore.includes(key));
  }

  const renderCellValue = (key: string, value: any) => {
    if (customRenderCell) {
      return customRenderCell(key, value);
    }
    if (key === 'created_at' || key === 'updated_at') {
      return formatDateToLocal(value);
    } else if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {keys.map(key => (
            <th key={key}>{key}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            {keys.map(key => (
              <td key={`${item.id}-${key}`}>
                {item[key]}
              </td>
            ))}
            <td>
              {renderActions(item)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}