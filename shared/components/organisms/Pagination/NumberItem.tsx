import React, { FC } from 'react'
import { Typography } from '../..'
import Link from "next/link";

export interface NumberItemProps {
  active?: boolean
  href: string
  label: string | number
}

export const NumberItem: FC<NumberItemProps> = ({ label, active, href }) => {
  return (
    <Link
      className={[
        'button button__number',
        active ? 'button button__number--active' : '',
      ].join(' ')}
      href={href}
    >
      <Typography variant="bodySmall" color={active ? 'white' : 'black'}>
        {label}
      </Typography>
    </Link>
  )
}

NumberItem.defaultProps = {
  active: false,
}
