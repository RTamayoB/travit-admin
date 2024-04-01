import React, { FC, ReactNode } from 'react'
import './alert.scss'
import { Typography } from '../..'
import * as Icons from '../../../assets/svg/alerts'
import CloseIcon from '../../../assets/svg/close.svg'
import Image from 'next/image'
export interface AlertProps {
  variant?: 'success' | 'warning' | 'info' | 'danger' | 'basic'
  icon?: boolean | ReactNode
  closable?: boolean
}

export const Alert: FC<AlertProps> = ({ variant, icon, closable }) => {
  const sourceIcon = Icons[variant ?? 'success']

  return (
    <div className={`msv-alert msv-alert--${variant}`}>
      {icon &&
        (typeof icon === 'boolean' ? (
          <Image src={sourceIcon} alt={`${variant} icon.`} />
        ) : (
          icon
        ))}
      <Typography variant="bodySmall" bold>
        Alert
      </Typography>
      {closable && (
        <button
          type="button"
          className={`msv-alert__close msv-alert__close--${variant}`}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  )
}

Alert.defaultProps = {
  variant: 'success',
  icon: true,
  closable: true,
}
