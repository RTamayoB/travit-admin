import React, { FC, useState } from 'react'
import { Logo } from '../../atoms'
import { SideBarItem, SideBarItemProps } from './SiteBarItem'
import { logos, sideBarVariants } from '../../../../shared/constants'
import './sideBar.scss'

export interface SideBarProps {
  contentItems: SideBarItemProps[]
  footerItems: SideBarItemProps[]
}

export const SideBar: FC<SideBarProps> = ({ contentItems, footerItems }) => {
  const [sideBarState, setSideBarState] = useState<sideBarVariants>('close')

  return (
    <div
      className={`msv-sidebar msv-sidebar--${sideBarState}`}
      onMouseEnter={() => setSideBarState('open')}
      onMouseLeave={() => setSideBarState('close')}
    >
      <span className="msv-sidebar__sideIcon" />
      <div className="msv-sidebar__section msv-sidebar__section--header">
        <Logo
          variant={logos[sideBarState].type}
          width={logos[sideBarState].size}
        />
      </div>
      <div className="msv-sidebar__section msv-sidebar__section--content">
        {contentItems.map((item) => (
          <SideBarItem key={item.label} {...item} variant={sideBarState} />
        ))}
      </div>
      <div className="msv-sidebar__section msv-sidebar__section--footer">
        {footerItems.map((item) => (
          <SideBarItem key={item.label} {...item} variant={sideBarState} />
        ))}
      </div>
    </div>
  )
}

SideBar.defaultProps = {}
