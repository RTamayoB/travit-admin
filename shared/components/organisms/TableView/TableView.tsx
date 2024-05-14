import React, { FC, ReactNode, useEffect, useState } from 'react'

import './tableview.scss'

export interface TableViewProps {
  tableTitle?: string
  itemsPerPage?: number
  actionButtons?: ReactNode[]
  roundedPagination?: boolean
  tableData?: TransformDataTable[]
  paginationAlign?: 'left' | 'center' | 'right'
}

export interface TransformDataTable {
  [key: string]: {
    value: string
    component: ReactNode
  }
}

export const TableView: FC<TableViewProps> = ({
  tableData,
  tableTitle,
  itemsPerPage,
  actionButtons,
  paginationAlign,
  roundedPagination,
}) => {
  const [activePage, setActivePage] = useState(0)
  const [pageChunks, setPageChunks] = useState<TransformDataTable[][]>([])
  const [filteredData, setFilteredData] = useState<TransformDataTable[]>(
    tableData ?? [],
  )
  const [totalPages, setTotalPages] = useState(0)

  // divide pages array into equal part chunks
  const getPageDivisions = () => {
    let chunks: TransformDataTable[][] = []
    if (filteredData) {
      for (let i = 0; i < filteredData.length; i += itemsPerPage ?? 10) {
        const chunk = filteredData.slice(i, i + (itemsPerPage ?? 10))
        chunks.push(chunk)
      }
    }
    setPageChunks(chunks)
  }

  useEffect(() => {
    getPageDivisions()
    setTotalPages(
      filteredData ? Math.ceil(filteredData?.length / (itemsPerPage ?? 10)) : 0,
    )
  }, [filteredData])

  return (
    <div className="msv-tableView">
      <div className="msv-tableView__header">
        <div className="top">
          {tableTitle && (
            <Typography variant="h5" bold>
              {tableTitle}
            </Typography>
          )}
          <div className="top__buttons">
            {actionButtons && actionButtons.map((ab) => ab)}
          </div>
        </div>
        <Searchbar
          id="table_search"
          style={{ maxWidth: 300 }}
          searchItems={tableData ?? []}
          onSearch={(value) =>
            setFilteredData(value as unknown as TransformDataTable[])
          }
        />
      </div>
      <Table tableData={pageChunks[activePage]} />
      <Pagination
        align={paginationAlign}
        totalPages={totalPages}
        rounded={roundedPagination}
        onIndexChange={setActivePage}
        className="msv-tableView__pagination"
      />
    </div>
  )
}

TableView.defaultProps = {
  itemsPerPage: 10,
  tableData: undefined,
  tableTitle: undefined,
  paginationAlign: 'left',
  roundedPagination: false,
  actionButtons: undefined,
}
