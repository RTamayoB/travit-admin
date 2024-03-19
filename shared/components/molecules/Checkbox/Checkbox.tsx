import React, { FC, ReactNode, useEffect, useState } from 'react'
import { Typography } from '../..'
import './checkbox.scss'

export interface CheckboxProps {
  label?: ReactNode
  checked?: boolean
  disabled?: boolean
  defaultChecked?: boolean
  onChecked: (value: boolean) => void
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  checked,
  disabled,
  onChecked,
  defaultChecked,
}) => {
  const [focused, setFocused] = useState(false)
  const [localDefault, setLocalDefault] = useState(defaultChecked)

  useEffect(() => {
    setLocalDefault(defaultChecked)
  }, [defaultChecked])

  return (
    <label
      data-checked={checked}
      data-focused={focused}
      data-disabled={disabled}
      className="msv-checkbox"
      onMouseUp={() => setFocused(false)}
      onMouseDown={() => setFocused(true)}
    >
      <Typography variant="bodySmall" color="#505660">
        {label}
      </Typography>
      <input
        type="checkbox"
        disabled={disabled}
        defaultChecked={localDefault}
        onChange={(e) => onChecked(e.target.checked)}
      />
      <span className="checkmark"></span>
    </label>
  )
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  label: undefined,
  onChecked: undefined,
  defaultChecked: undefined,
}
