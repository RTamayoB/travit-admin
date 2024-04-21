import React, { FC, useState } from 'react'
import { Logo } from '../../atoms'
import { SideBarItem, SideBarItemProps } from './SiteBarItem'
import { logos, sideBarVariants } from '../../../../shared/constants'
import './sideBar.scss'

export interface SideBarProps {
  footerItems: SideBarItemProps[]
  contentItems: SideBarItemProps[]
}

export const SideBar: FC<SideBarProps> = ({ contentItems, footerItems }) => {
  const [sideBarState, setSideBarState] = useState<sideBarVariants>('close')

  return (
    <div
      onMouseEnter={() => setSideBarState('open')}
      onMouseLeave={() => setSideBarState('close')}
      className={`msv-sidebar msv-sidebar--${sideBarState}`}
    >
      <span className="msv-sidebar__sideIcon" />
      <div className="msv-sidebar__section msv-sidebar__section--header">
        <Logo
          width={logos[sideBarState].size}
          variant={logos[sideBarState].type}
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
