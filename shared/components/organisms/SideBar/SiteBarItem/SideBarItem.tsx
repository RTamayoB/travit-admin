import React, { ButtonHTMLAttributes, FC, useState } from 'react'
import Image from 'next/image'
import { Typography } from '../../../'
import { sideBarVariants } from '@/shared/constants'
import './sideBarItem.scss'
import ArrowIcon from '../../../../assets/svg/downArrow.svg'
export interface SingleSideBarItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'label' | 'onClick'> {
  icon: string
  route: string
  label?: string
  variant?: sideBarVariants
  iconAlign?: 'left' | 'right'
  onClick: (route: string) => void
}
export interface SideBarItemProps extends SingleSideBarItemProps {
  subItems?: SingleSideBarItemProps[]
}

const SingleItem: FC<SingleSideBarItemProps> = ({
  icon,
  label,
  route,
  variant,
  onClick,
  iconAlign,
  ...props
}) => {
  const handleClick = () => {
    if (onClick) onClick(route)
  }

  return (
    <button
      onClick={handleClick}
      className={`msv-sideBarItem msv-sideBarItem--${variant} msv-sideBarItem__icon--${iconAlign}`}
      {...props}
    >
      <Image src={icon} alt={label ?? 'SideBar Option'} />
      <Typography variant="bodySmall" bold color="#434343">
        {label}
      </Typography>
    </button>
  )
}

export const SideBarItem: FC<SideBarItemProps> = ({
  icon,
  label,
  variant,
  subItems,
  iconAlign,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="msv-singleSideBarItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SingleItem
        label={label}
        variant={variant}
        iconAlign={iconAlign}
        icon={isHovered && subItems ? ArrowIcon : icon}
        {...props}
      />
      {subItems && (
        <div className="msv-singleSideBarItem__subItems">
          {subItems?.map((sitem) => (
            <SingleItem key={sitem.label} {...sitem} />
          ))}
        </div>
      )}
    </div>
  )
}

SideBarItem.defaultProps = {
  label: undefined,
  variant: 'close',
  iconAlign: 'right',
  subItems: undefined,
}
