import React, { FC, ReactNode } from 'react'
import { Typography } from '../..'
import './tableview.scss'

export interface TableData {
  [key: string]: ReactNode
}
export interface TableViewProps {
  columnKeys?: string[]
  tableData?: Array<TableData>
}

export const TableView: FC<TableViewProps> = ({ columnKeys, tableData }) => {
  const getColumnKeys = () => {
    if (columnKeys) {
      return columnKeys
    }
    if (tableData) {
      return Object.keys(tableData[0])
    }
    return []
  }

  return (
    <div className="msv-table">
      {getColumnKeys().map((col) => (
        <div className="msv-table__header" key={col}>
          <Typography variant="bodySmall" bold>
            {col}
          </Typography>
        </div>
      ))}
      <div>
        {tableData?.map((item, index) => (
          <div
            key={`data-col-${'col'}-row-${index}`}
            className="msv-table__content__row"
          >
            {item['col']}
          </div>
        ))}
      </div>
    </div>
  )
}

TableView.defaultProps = {
  columnKeys: undefined,
}
