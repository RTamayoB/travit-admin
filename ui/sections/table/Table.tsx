import Pagination from "./pagination/Pagination";
import styles from "./table.module.scss";

interface TableProps {
  data: any[];
  keysToIgnore: string[] | undefined;
  actions?: React.ReactNode;
}

function Table({
  data,
  keysToIgnore = [],
  actions,
}: TableProps) {
  let keys: string[] = [];

  if (data && data.length > 0) {
    keys = Object.keys(data[0]).filter((key) => !keysToIgnore.includes(key));
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {keys.map((key) => <th key={key}>{key.replace("_", " ")}</th>)}
            {actions && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {keys.map((key) => (
                <td key={`${item.id}-${key}`}>
                  {item[key]}
                </td>
              ))}
              {actions && (
                <td>
                  {actions}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={10} />
    </div>
  );
}

export default Table;
