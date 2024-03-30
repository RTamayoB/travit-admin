import React, { FC } from 'react'
import { Typography } from '../..'

export interface NumberItemProps {
  active?: boolean
  onClick: () => void
  label: string | number
}

export const NumberItem: FC<NumberItemProps> = ({ label, active, onClick }) => {
  return (
    <button
      className={[
        'button button__number',
        active ? 'button button__number--active' : '',
      ].join(' ')}
      onClick={onClick}
    >
      <Typography variant="bodySmall" color={active ? 'white' : 'black'}>
        {label}
      </Typography>
    </button>
  )
}

NumberItem.defaultProps = {
  active: false,
}
