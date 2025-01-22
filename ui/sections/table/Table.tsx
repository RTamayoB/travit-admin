import styles from "./table.module.scss";

interface TableProps {
  data: any[];
  keysToIgnore?: string[] | undefined;
  actions?: (item: any) => React.ReactNode;
}

function Table({
  data,
  keysToIgnore = [],
  actions,
}: TableProps) {
  let keys: string[] = [];

  const columnTranslations: Record<string, string> = {
    id: "ID",
    name: "Nombre",
    description: "Descripción",
    created_at: "Fecha de creación",
    line_id: "ID de línea",
    action: "Tipo de acción",
    status: "Estado",
    notes: "Notas",
    requester_name: "Nombre del solicitante",
    line_number: "Numero de línea",
    legacy_line_number: "Numero de línea anterior",
    units: "Unidades",
    transport_type: "Tipo de transporte",
    line_type: "Tipo de línea"
  }

  const translateColumn = (key: string) => columnTranslations[key] || key

  if (data && data.length > 0) {
    keys = Object.keys(data[0]).filter((key) => !keysToIgnore.includes(key));
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {keys.map((key) => <th key={key}>{translateColumn(key)}</th>)}
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
                {actions(item)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
