import React, { FC } from 'react'
import { Dropdown, Typography } from '../..'
import { NumberItem } from './NumberItem'
import { Base } from '../../../interfaces'
import './pagination.scss'
import { usePagination } from './usePagination'

export interface PaginationProps extends Base {
  totalPages: number
  rounded?: boolean
  align?: 'left' | 'center' | 'right'
}

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  rounded,
  align,
  className,
  style,
}) => {
  // get values from usePaginationHook
  const {
    pages,
    activePage,
    pageChunks,
    activeChunk,
    setActivePage,
    pagesDropdown,
    handleNextArrow,
    handlePrevArrow,
  } = usePagination(totalPages)

  return (
    <div
      className={['msv-pagination', `msv-pagination--${align}`, className].join(
        ' ',
      )}
      style={style}
    >
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
        {(pageChunks[activeChunk[0]]?.length > 1
          ? pageChunks[activeChunk[0]]
          : pageChunks[activeChunk[0] - 1]
        )?.map(
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
  align: 'left',
}
