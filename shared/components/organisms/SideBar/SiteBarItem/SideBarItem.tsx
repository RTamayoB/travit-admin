import React, { ButtonHTMLAttributes, FC } from 'react'
import Image from 'next/image'
import { Typography } from '../../../'
import { sideBarVariants } from '@/shared/constants'
import './sideBarItem.scss'

export interface SideBarItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'label'> {
  label?: string
  icon: string
  variant?: sideBarVariants
}

export const SideBarItem: FC<SideBarItemProps> = ({
  label,
  icon,
  variant,
  ...props
}) => {
  const showLabel = variant === 'open'
  return (
    <button
      className={`msv-sideBarItem msv-sideBarItem--${variant}`}
      {...props}
    >
      <Image src={icon} alt={label ?? 'SideBar Option'} />
      {showLabel && (
        <Typography variant="bodySmall" bold color="#434343">
          {label}
        </Typography>
      )}
    </button>
  )
}

SideBarItem.defaultProps = {
  label: undefined,
  variant: 'close',
}
