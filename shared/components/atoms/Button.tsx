import React, {
  FC,
  useState,
  ReactNode,
  CSSProperties,
  ButtonHTMLAttributes,
} from 'react'
import './button.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  block?: boolean
  className?: string
  leadIcon?: ReactNode
  onClick?: () => void
  style?: CSSProperties
  trailIcon?: ReactNode
  color?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
}

export const Button: FC<ButtonProps> = ({
  size,
  label,
  color,
  block,
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
      {label}
      {trailIcon}
    </button>
  )
}

Button.defaultProps = {
  label: '',
  block: false,
  size: 'medium',
  color: 'primary',
  onClick: undefined,
  leadIcon: undefined,
  trailIcon: undefined,
}
