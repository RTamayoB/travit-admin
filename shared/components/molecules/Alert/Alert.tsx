import React, { FC, ReactNode } from 'react'
import Image from 'next/image'
import * as Icons from '../../../assets/svg/alerts'
import { AlertVariants, Base, Typography } from '../../../'
import './alert.scss'

export interface AlertProps extends Base {
  closable?: boolean
  children: ReactNode
  onClose?: () => void
  variant?: AlertVariants
  icon?: boolean | ReactNode
}

export const Alert: FC<AlertProps> = ({
  icon,
  style,
  variant,
  onClose,
  closable,
  children,
  className,
}) => {
  const SourceIcon = Icons[variant ?? 'success']

  return (
    <div
      className={[`msv-alert msv-alert--${variant}`, className].join(' ')}
      style={style}
    >
      <div className="msv-alert__content">
        {icon &&
          (typeof icon === 'boolean' ? (
            <Image src={SourceIcon} alt={`${variant} icon.`} />
          ) : (
            icon
          ))}
        <Typography variant="bodySmall" bold>
          {children}
        </Typography>
      </div>
      {closable && (
        <button
          type="button"
          onClick={onClose}
          className={`msv-alert__close msv-alert__close--${variant}`}
        />
      )}
    </div>
  )
}

Alert.defaultProps = {
  icon: true,
  closable: false,
  variant: 'success',
}
