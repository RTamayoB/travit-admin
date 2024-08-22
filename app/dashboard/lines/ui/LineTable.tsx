import {Button, LinkButton } from '@/shared';
import { Line } from '@/app/lib/definitions';
import { deleteLine } from '@/app/dashboard/lines/[id]/edit/data/delete-line';
import Table from '@/shared/components/organisms/TableView/Table/Table';

export default function LineTable({
    lines,
    onFocusToggle,
    focusedLine
  }: {
    lines: any[],
    onFocusToggle: (line: Line) => void,
    focusedLine: Line | null
  }) {
    const renderActions = (line: Line) => (
      <>
        <Button onClick={() => onFocusToggle(line)}>
          {focusedLine && focusedLine.id === line.id ? 'Desenfocar' : 'Enfocar'}
        </Button>
        <LinkButton label='Editar' href={`/dashboard/lines/${line.id}/edit`} />
        <Button onClick={() => deleteLine(line.id)}>Eliminar</Button>
      </>
    );
  
    return (
      <Table
        data={lines}
        keysToIgnore={['route_points']}
        renderActions={renderActions}
      />
    );
  }
