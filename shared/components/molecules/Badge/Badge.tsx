import React, { FC, JSXElementConstructor, SVGProps } from 'react'
import { Typography, Base, ButtonSizes, BadgeColors } from '../../../'
import './badge.scss'

export interface BadgeProps extends Base {
  size?: ButtonSizes
  color?: BadgeColors
  label?: string
  variant?: 'outlined' | 'filled'
  // they need to be this type of element so svgs can
  // change colors according to the one selected
  LeadIcon?: JSXElementConstructor<SVGProps<SVGSVGElement>>
  TrailIcon?: JSXElementConstructor<SVGProps<SVGSVGElement>>
}

export const Badge: FC<BadgeProps> = ({
  size,
  color,
  label,
  style,
  variant,
  LeadIcon,
  TrailIcon,
  className,
}) => {
  return (
    <div
      style={style}
      className={`msv-badge msv-badge--${size} ${color} ${color}--${variant} ${className}`}
    >
      {LeadIcon && <LeadIcon />}
      <Typography bold variant="bodySmall">
        {label}
      </Typography>
      {TrailIcon && <TrailIcon />}
    </div>
  )
}

Badge.defaultProps = {
  color: 'blue',
  size: 'medium',
  variant: 'filled',
  label: undefined,
}
