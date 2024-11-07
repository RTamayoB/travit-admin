import './table.scss';

export default function Table({
  data,
  keysToIgnore = [],
  renderActions,
}: {
  data: any[],
  keysToIgnore?: string[],
  renderActions: (item: any) => JSX.Element,
}) {
  let keys: string[] = [];

  if (data && data.length > 0) {
    keys = Object.keys(data[0]).filter(key => !keysToIgnore.includes(key));
  }

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