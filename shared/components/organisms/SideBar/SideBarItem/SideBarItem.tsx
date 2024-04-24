import React, { FC, useState } from 'react'
import ArrowIcon from '../../../../assets/svg/downArrow.svg'
import { SingleItem, SingleSideBarItemProps } from '../SingleItem'
import './sideBarItem.scss'

export interface SideBarItemProps extends SingleSideBarItemProps {
  subItems?: SingleSideBarItemProps[]
}

export const SideBarItem: FC<SideBarItemProps> = ({
  icon,
  subItems,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="msv-sideBarItem"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SingleItem icon={isHovered && subItems ? ArrowIcon : icon} {...props} />
      {subItems && (
        <div className="msv-sideBarItem__subItems">
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
