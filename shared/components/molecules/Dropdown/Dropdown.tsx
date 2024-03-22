import React, { FC, KeyboardEvent, use, useEffect, useState } from 'react'
import { Base } from '../../../../shared/interfaces'
import './dropdown.scss'

export interface Option {
  label: string
  value: string
}
export interface DropdownProps extends Base {
  data: Option[]
  onSelected: (selected: Option | undefined) => void
}

export const Dropdown: FC<DropdownProps> = ({
  data,
  onSelected,
  className,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState<string>('')
  const [filteredOps, setFilteredOps] = useState(data)
  const [selected, setSelected] = useState<Option | undefined>(undefined)

  const handleOptionClick = (i: Option) => {
    setSelected(i)
    setSearch(i.label)
  }
  // Allow user to use Enter key to blur input focus
  const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }
  //Action Blur
  const handleBlur = () => {
    // Check if search is equal to any of the options
    const searchExists = data.find(
      (i) => i.label.toLowerCase() === search?.toLowerCase(),
    )
    // If it doesn't exists clear all values
    if (!searchExists) {
      setSelected(undefined)
      setSearch('')
    } else {
      setSelected(searchExists)
      setSearch(searchExists.label)
    }
    setIsOpen(false)
  }
  // Input change action
  const handleInputChange = (value: string) => {
    setSearch(value)
    if (value) {
      // Filter the options according to the search
      const filtered = data.filter(({ label }) =>
        label.toLowerCase().includes(value?.toLowerCase()),
      )
      setFilteredOps(filtered)
    } else {
      setFilteredOps(data)
    }
  }

  // Return selected value to the user every time it changes
  useEffect(() => {
    onSelected(selected)
  }, [selected, onSelected])

  return (
    <div className={['msv-dropdown', className].join(' ')} style={style}>
      <div className="msv-dropdown__input" data-opened={isOpen}>
        <input
          onFocus={() => setIsOpen(true)}
          value={search}
          onBlur={handleBlur}
          placeholder="Select..."
          onKeyUp={(e) => handleOnKeyUp(e)}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      <div
        className={[
          'msv-dropdown__optionsContainer',
          isOpen && 'msv-dropdown__optionsContainer--opened',
        ].join(' ')}
      >
        {filteredOps.map((i) => (
          <button
            type="button"
            key={i.value}
            onClick={() => handleOptionClick(i)}
            data-selected={selected?.value === i.value}
            className="msv-dropdown__optionsContainer__option"
          >
            {i.label}
          </button>
        ))}
      </div>
    </div>
  )
}

Dropdown.defaultProps = {}
