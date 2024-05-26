'use client';

import React, { FC, useState, ReactNode, ButtonHTMLAttributes } from 'react'
import { ButtonColors, ButtonSizes, Base } from '../../../'
import './button.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, Base {
  block?: boolean
  size?: ButtonSizes
  children?: ReactNode
  leadIcon?: ReactNode
  onClick?: () => void
  color?: ButtonColors
  trailIcon?: ReactNode
  formAction?: (formData: FormData) => void
}

export const Button: FC<ButtonProps> = ({
  size,
  color,
  block,
  children,
  leadIcon,
  className,
  trailIcon,
  formAction,
  ...props
}) => {
  const [buttonState, setButtonState] = useState('default')

  return (
    <button
      formAction={formAction}
      onMouseDown={() => setButtonState('focus')}
      onMouseUp={() => setButtonState('active')}
      onBlur={() => setButtonState('default')}
      type={formAction ? 'submit' : 'button'}
      className={[
        `msv-button__${color}`,
        `msv-button--${size}`,
        `msv-button__${color}--${buttonState}`,
        block && 'msv-button--block',
        className,
      ].join(' ')}
      {...props}
    >
      {leadIcon}
      {children}
      {trailIcon}
    </button>
  )
}

Button.defaultProps = {
  children: '',
  block: false,
  size: 'medium',
  color: 'primary',
  onClick: undefined,
  leadIcon: undefined,
  trailIcon: undefined,
  formAction: undefined,
}
