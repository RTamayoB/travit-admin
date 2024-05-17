import React, { ButtonHTMLAttributes, FC } from 'react'
import Image from 'next/image'
import { Typography } from '../../../'
import UserLogo from '../../../../assets/svg/user.svg'
import DefaultCircle from '../../../../assets/svg/circle.svg'
import { sideBarVariants } from '../../../../../shared/constants'
import './singleItem.scss'
import Link from "next/link";

export interface SingleSideBarItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'label' | 'onClick'> {
  icon?: string
  route: string
  label?: string
  subtitle?: string
  variant?: sideBarVariants
  iconAlign?: 'left' | 'right'
  isForProfile?: boolean
  onClick: (route: string) => void
}

export const SingleItem: FC<SingleSideBarItemProps> = ({
  icon,
  label,
  route,
  variant,
  onClick,
  iconAlign,
  subtitle,
  isForProfile,
  ...props
}) => {
  const getIcon = () => {
    if (icon) return icon
    if (isForProfile) return UserLogo
    return DefaultCircle
  }

  const handleClick = () => {
    if (onClick) onClick(route)
  }

  return (
    <Link
      href={route}
      className={`msv-singleSideBarItem msv-singleSideBarItem--${variant} msv-singleSideBarItem__icon--${iconAlign}`}
    >
      <Image src={getIcon()} alt={label ?? 'SideBar Option'} />
      <div>
        {label && (
          <Typography variant="bodySmall" bold color="#434343">
            {label}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="note" bold color="#999999">
            {subtitle}
          </Typography>
        )}
      </div>
    </Link>
  )
}
