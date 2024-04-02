import React, {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  ReactNode,
  useState,
} from 'react'
import './textField.scss'
import { Typography } from '..'
import { ButtonSizes } from '../../../../shared/constants'

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id: string
  label?: string
  size?: ButtonSizes
  required?: boolean
  helperText?: string
  leadIcon?: ReactNode
  trailIcon?: ReactNode
  inputState?: 'default' | 'error' | 'success'
}

export const TextField: FC<TextFieldProps> = ({
  id,
  label,
  size,
  leadIcon,
  disabled,
  required,
  onChange,
  trailIcon,
  inputState,
  helperText,
  ...props
}) => {
  const [isFilled, setIsFilled] = useState(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsFilled(!!e.target.value)
    if (onChange) {
      onChange(e)
    }
  }
  return (
    <div className="msv-textField">
      <div
        data-disabled={disabled}
        data-filled={isFilled}
        className={[
          'msv-textField__topView',
          `msv-textField__topView--${inputState === 'error' ? 'error' : 'default'}`,
          `msv-textField__topView--${size}`,
        ].join(' ')}
      >
        {label && (
          <label htmlFor={id}>
            <Typography bold variant="note">
              {label}
              {required && <span style={{ color: '#D04116' }}> *</span>}
            </Typography>
          </label>
        )}
        {leadIcon}
        <input
          id={id}
          name={id}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />
        {trailIcon}
      </div>
      <div className="msv-textField__helperView">
        {inputState !== 'default' && (
          <span className={`span span--${inputState}`} />
        )}
        {helperText && (
          <Typography variant="note" color="#434343">
            {helperText}
          </Typography>
        )}
      </div>
    </div>
  )
}

TextField.defaultProps = {
  size: 'medium',
  required: false,
  leadIcon: false,
  disabled: false,
  label: undefined,
  trailIcon: false,
  inputState: 'default',
  helperText: undefined,
}
