import React, {
  FC,
  useState,
  ReactNode,
  CSSProperties,
  ButtonHTMLAttributes,
} from 'react'
import { ButtonColors, ButtonSizes } from '../../../contants'
import { Base } from '../../../../shared/interfaces'
import './button.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, Base {
  children?: ReactNode
  block?: boolean
  size?: ButtonSizes
  leadIcon?: ReactNode
  onClick?: () => void
  color?: ButtonColors
  trailIcon?: ReactNode
}

export const Button: FC<ButtonProps> = ({
  size,
  color,
  block,
  children,
  leadIcon,
  className,
  trailIcon,
  ...props
}) => {
  const [buttonState, setButtonState] = useState('default')

  return (
    <button
      onMouseDown={() => setButtonState('focus')}
      onMouseUp={() => setButtonState('active')}
      onBlur={() => setButtonState('default')}
      type="button"
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
}
