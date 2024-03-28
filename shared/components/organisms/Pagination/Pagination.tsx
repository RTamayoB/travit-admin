import React, { FC, useEffect, useState } from 'react'
import { Dropdown, Typography } from '../..'
import { NumberItem } from './NumberItem'
import './pagination.scss'

export interface PaginationProps {
  totalPages: number
  rounded?: boolean
}

export const Pagination: FC<PaginationProps> = ({ totalPages, rounded }) => {
  const [activePage, setActivePage] = useState(0)
  const [activeChunk, setActiveChunk] = useState([0, 0])
  const [pageChunks, setPageChunks] = useState<number[][]>([])
  // number of pages per division
  const chunkSize = 3
  // convert total pages into an array for splitting
  const pages = Array.from(Array(totalPages).keys())
  // convertion of pages array for dropdown use
  const pagesDropdown = pages.map((i) => ({
    label: (i + 1).toString(),
    value: i.toString(),
  }))
  // divide pages array into equal part chunks
  const getPageDivisions = () => {
    let chunks: number[][] = []
    for (let i = 0; i < pages.length; i += chunkSize) {
      const chunk = pages.slice(i, i + chunkSize)
      chunks.push(chunk)
    }
    setPageChunks(chunks)
  }
  // Arrow button actions
  const handlePrevArrow = () => {
    if (activePage > 0) {
      setActivePage((oldActive) => oldActive - 1)
    }
  }
  const handleNextArrow = () => {
    if (activePage < pages.length - 1) {
      setActivePage((oldActive) => oldActive + 1)
    }
  }
  // get the location of the activePage every time it changes
  useEffect(() => {
    let rowIndex = -1
    let columnIndex = -1
    // Iterate over the outer array
    for (let i = 0; i < pageChunks.length; i++) {
      // Iterate over the inner array at index i
      for (let j = 0; j < pageChunks[i].length; j++) {
        // Check if the current element matches the number we're looking for
        if (pageChunks[i][j] === activePage) {
          rowIndex = i
          columnIndex = j
          break
        }
      }
      // Break the outer loop if the number is found
      if (rowIndex !== -1) {
        break
      }
    }
    setActiveChunk([rowIndex, columnIndex])
  }, [activePage, pageChunks])
  // get pages division before all
  useEffect(() => {
    getPageDivisions()
  }, [])

  return (
    <div className="msv-pagination">
      <div className="msv-pagination__pageSelector">
        <Typography variant="bodySmall">Page</Typography>
        <Dropdown
          style={{ width: 70 }}
          data={pagesDropdown}
          onSelected={(value) => setActivePage(parseInt(value?.value ?? '0'))}
          defaultSelected={pagesDropdown[activePage]}
        />
        <Typography variant="bodySmall">Out Of {totalPages}</Typography>
      </div>
      <div
        className={['msv-pagination__pageButtons', rounded && 'rounded'].join(
          ' ',
        )}
      >
        <button
          className="button button__doubleArrow"
          onClick={() => setActivePage(0)}
        />
        <button
          className="button button__singleArrow"
          onClick={handlePrevArrow}
        />
        {pageChunks[activeChunk[0]]?.map(
          (i) =>
            i !== pages.length - 1 && (
              <NumberItem
                key={i}
                label={i + 1}
                active={activePage === i}
                onClick={() => setActivePage(i)}
              />
            ),
        )}
        {totalPages > 3 && (
          <button className={['button button__number'].join(' ')}>
            <Typography variant="bodySmall">...</Typography>
          </button>
        )}
        <NumberItem
          active={activePage === pages.length - 1}
          onClick={() => setActivePage(pages.length - 1)}
          label={pages.length}
        />
        <button
          onClick={handleNextArrow}
          className={[
            'button button__singleArrow',
            'button button__singleArrow--right',
          ].join(' ')}
        />
        <button
          onClick={() => setActivePage(pages.length - 1)}
          className={[
            'button button__doubleArrow',
            'button button__doubleArrow--right',
          ].join(' ')}
        />
      </div>
    </div>
  )
}

Pagination.defaultProps = {
  rounded: false,
}
