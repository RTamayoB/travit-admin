import React, { FC, JSXElementConstructor, SVGProps } from 'react'
import { Logotipo } from './Logotipo'
import { Isotipo } from './Isotipo'

export interface LogoVariants {
  [key: string]: JSXElementConstructor<SVGProps<SVGSVGElement>>
}
const logos: LogoVariants = {
  logo: Logotipo,
  iso: Isotipo,
}

export interface LogoProps extends SVGProps<SVGSVGElement> {
  variant?: 'logo' | 'iso'
}

export const Logo: FC<LogoProps> = ({ variant, ...props }) => {
  const SelectedLogo = logos[variant ?? 'logo']
  return <SelectedLogo {...props} />
}
