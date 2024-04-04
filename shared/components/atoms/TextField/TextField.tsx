import React, { FC, ReactNode } from 'react'
import './textField.scss'
import { Typography } from '..'

export interface TextFieldProps {
  leadIcon?: ReactNode
  trailIcon?: ReactNode
}

export const TextField: FC<TextFieldProps> = ({ leadIcon, trailIcon }) => {
  return (
    <div className="msv-textField">
      <div className="msv-textField__topView">
        {leadIcon}
        <input className="" placeholder="Placeholder" />
        {trailIcon}
      </div>
      <div className="msv-textField__helperView">
        <span />
        <Typography variant="note" color="#434343">
          Helper text here
        </Typography>
      </div>
    </div>
  )
}

TextField.defaultProps = {
  leadIcon: false,
  trailIcon: false,
}
