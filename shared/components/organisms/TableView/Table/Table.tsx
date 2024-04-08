import React, { FC, ReactNode } from 'react'
import { TransformDataTable, Typography } from '../../..'
import './table.scss'

export interface TableData {
  [key: string]: ReactNode
}
export interface TableProps {
  columnKeys?: string[]
  tableData?: TransformDataTable[]
}

export const Table: FC<TableProps> = ({ columnKeys, tableData }) => {
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
        <div key={col} className="msv-table__content">
          <div className="msv-table__content__header">
            <div key={col} className="columnKey">
              <Typography variant="bodySmall" bold>
                {col}
              </Typography>
            </div>
          </div>
          {tableData?.map((item, index) => (
            <div key={`data-col-${col}-row-${index}`} className="cellContent">
              {item[col].component}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

Table.defaultProps = {
  columnKeys: undefined,
}
