import React, { FC } from 'react'
import Image from 'next/image'
import { sideBarVariants } from '../../../../../shared/constants'
import './sideBarItem.scss'
import Link from "next/link";
import {usePathname} from "next/navigation";
import Typography from '@/ui/components/typography';

export interface Destination {
  icon: string,
  label: string,
  route: string,
  subtitle?: string,
  variant?: sideBarVariants
}

export const SingleItem: FC<Destination> = ({
  icon,
  label,
  route,
  subtitle,
  variant
}) => {
  const currentPath = usePathname()

  const isActive = currentPath === route

  return (
    <Link
      href={route}
      style={{ textDecoration: 'none' }}
    >
      <button
        className={`msv-singleSideBarItem msv-singleSideBarItem--${variant} msv-singleSideBarItem--${isActive ? 'focus' : ''}`}
      >
        <Image
          src={icon}
          width={24}
          height={24}
          blurDataURL={icon}
          alt={label ?? 'SideBar Option'}
        />
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
      </button>
    </Link>
  )
}
