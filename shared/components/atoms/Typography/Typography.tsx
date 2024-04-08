import React, { CSSProperties, FC, ReactNode } from 'react'
import { TextVariants, getVariantTag } from '../../../'

import './typography.scss'

export interface TypographyProps {
  bold?: boolean
  color?: string
  className?: string
  children?: ReactNode
  style?: CSSProperties
  variant?: TextVariants
}

export const Typography: FC<TypographyProps> = ({
  bold,
  color,
  style,
  variant,
  children,
  className,
}) => {
  const CustomTag = getVariantTag(
    variant || 'bodyMedium',
  ) as keyof JSX.IntrinsicElements

  return (
    <CustomTag
      style={{ color, ...style }}
      className={[
        'msv-font',
        `msv-font__${variant}`,
        bold && 'msv-font--bold',
        className,
      ].join(' ')}
    >
      {children}
    </CustomTag>
  )
}

Typography.defaultProps = {
  bold: false,
  color: undefined,
  style: undefined,
  className: undefined,
  variant: 'bodyMedium',
}
