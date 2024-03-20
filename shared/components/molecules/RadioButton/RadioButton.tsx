import React, { FC, useEffect, useState } from 'react'
import { Base } from '../../../../shared/interfaces'
import './radioButton.scss'

export interface RadioButtonProps extends Base {
  data: Array<string>
  disabled?: boolean
  onChange: (selected: string | undefined) => void
}

export const RadioButton: FC<RadioButtonProps> = ({
  data,
  style,
  onChange,
  disabled,
  className,
}) => {
  const [selected, setSelected] = useState<string | undefined>(undefined)

  useEffect(() => {
    onChange(selected)
  }, [selected, onChange])

  return (
    <div style={style} className={className}>
      {data.map((i) => (
        <label className="msv-radio" key={i} data-disabled={disabled}>
          {i}
          <input
            name={i}
            type="radio"
            disabled={disabled}
            checked={selected === i}
            onClick={() => setSelected(i)}
          />
          <span className="msv-radio__button" />
        </label>
      ))}
    </div>
  )
}

RadioButton.defaultProps = {
  disabled: false,
}
