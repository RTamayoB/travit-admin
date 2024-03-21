import React, { CSSProperties, FC, ReactNode } from 'react'
import { TextVariants } from '../../../constants'
import { getVariantTag } from '../../../utils'
import './typography.scss'
export interface TypographyProps {
  bold?: boolean
  className?: string
  children?: ReactNode
  style?: CSSProperties
  variant?: TextVariants
}

export const Typography: FC<TypographyProps> = ({
  bold,
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
      style={style}
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
  style: undefined,
  className: undefined,
  variant: 'bodyMedium',
}
