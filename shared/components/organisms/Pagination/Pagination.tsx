'use client';

import { FC } from 'react'
import { Typography } from '../../../../shared/components/atoms/Typography'
import { Base } from '@/shared/interfaces'
import './pagination.scss'
import {usePathname, useSearchParams} from "next/navigation";
import { generatePagination } from '../../../../app/lib/utils'
import Link from "next/link";
import clsx from 'clsx';

export interface PaginationProps extends Base {
  rounded?: boolean
  totalPages: number
  align?: 'left' | 'center' | 'right'
}

export const Pagination: FC<PaginationProps> = ({
  style,
  align,
  rounded,
  className,
  totalPages
}) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div
      className={['msv-pagination', `msv-pagination--${align}`, className].join(
        ' ',
      )}
      style={style}
    >
      <div
        className={['msv-pagination__pageButtons', rounded && 'rounded'].join(
          ' ',
        )}
      >
        <PaginationArrow
          href={createPageURL(1)}
          type={"double_left"}
          isDisabled={currentPage <= 1}
        />
        <PaginationArrow
          href={createPageURL(currentPage - 1)}
          type={"left"}
          isDisabled={currentPage <= 1}
        />
        {allPages.map((page, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;

          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (page === '...') position = 'middle';

          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
            );
        })}
        <PaginationArrow
          href={createPageURL(currentPage + 1)}
          type={"right"}
          isDisabled={currentPage >= totalPages}
        />
        <PaginationArrow
          href={createPageURL(totalPages)}
          type={"double_right"}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </div>
  )
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    'link link__number',
    {
      'link link__number--active': isActive,
    },
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      <Typography variant="bodySmall" color={isActive ? 'white' : 'black'}>
        {page}
      </Typography>
    </Link>
  );
}

function PaginationArrow({
  href,
  type,
  isDisabled,
}: {
  href: string;
  type: 'double_left' | 'left'| 'right' | 'double_right';
  isDisabled?: boolean;
}) {

  const className = clsx(
      'link',
      {
        'link__doubleArrow': type === 'double_left',
        'link__singleArrow': type === 'left',
        'link__singleArrow link__singleArrow--right': type === 'right',
        'link__doubleArrow link__doubleArrow--right': type === 'double_right',
      },
    );

  return isDisabled ? (
      <div className={className}></div>
    ) : (
      <Link className={className} href={href}/>
      );
}

Pagination.defaultProps = {
  rounded: false,
  align: 'left',
}
