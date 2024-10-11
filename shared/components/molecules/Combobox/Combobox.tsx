import React, { FC, KeyboardEvent, useEffect, useState } from 'react'
import { Base } from '@/shared'
import './combobox.scss'
import { Typography } from '@/shared'
import EditIconButton from '@/app/dashboard/components/EditIconButton'

export interface Option {
  label: string
  value: string
}
export interface ComboboxProps extends Base {
  data: Option[],
  name: string,
  placeholder?: string
  defaultSelected?: Option
  onSelected: (selected: Option | undefined) => void,
  label?: string
}

export const Combobox: FC<ComboboxProps> = ({
  data,
  name,
  style,
  className,
  onSelected,
  placeholder,
  defaultSelected,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredOps, setFilteredOps] = useState(data)
  const [search, setSearch] = useState<string>(defaultSelected?.label ?? '')
  const [selected, setSelected] = useState<Option | undefined>(defaultSelected)
  const [highlightedIndex, setHighlightedIndex] = useState(-1) // For keyboard navigation

  const handleOptionClick = (i: Option) => {
    setSelected(i)
    onSelected(i)
    setSearch(i.label)
  }

  // Allow user to use Enter key to blur input focus or select an option
  const handleOnKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      handleKeyboardNavigation(e.key)
    }
  }

  const handleKeyboardNavigation = (key: string) => {
    if (key === 'ArrowDown') {
      setHighlightedIndex((prev) => (prev + 1) % filteredOps.length)
    } else if (key === 'ArrowUp') {
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredOps.length - 1))
    }
  }

  // Action Blur
  const handleBlur = () => {
    const searchExists = data.find(
      (i) => i.label.toLowerCase() === search?.toLowerCase(),
    )
    if (!searchExists) {
      setSelected(undefined)
      setSearch('')
      onSelected(undefined)
    } else {
      setSelected(searchExists)
      setSearch(searchExists.label)
      onSelected(searchExists)
    }
  }

  const handleInputChange = (value: string) => {
    setSearch(value)
    if (value) {
      const filtered = data.filter(({ label }) =>
        label.toLowerCase().includes(value?.toLowerCase()),
      )
      setFilteredOps(filtered)
    } else {
      setFilteredOps(data)
    }
  }

  useEffect(() => {
    setSearch(defaultSelected?.label ?? '')
    setSelected(defaultSelected)
  }, [defaultSelected])

  useEffect(() => {
    setIsOpen(false)
  }, [selected])

  return (
    <div className={['msv-combobox', className].join(' ')} style={style}>
      <div className="msv-combobox__input" data-opened={isOpen}>
        {label && (
          <label htmlFor={name}>
            <Typography bold variant="note">
              {label}
            </Typography>
          </label>
        )}
        <input
          onFocus={() => setIsOpen(true)}
          value={search}
          onBlur={handleBlur}
          placeholder={placeholder ?? 'Select...'}
          onKeyUp={(e) => handleOnKeyUp(e)}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <input type="hidden" name={name} value={selected?.value || ''} />
      </div>
      <div
        className={[
          'msv-combobox__optionsContainer',
          isOpen && 'msv-combobox__optionsContainer--opened',
        ].join(' ')}
      >
        {filteredOps.map((i, index) => (
          <div
            className={`msv-combobox__optionsContainer__option ${highlightedIndex === index ? 'highlighted' : ''}`}
            key={i.value}
            data-selected={selected?.value === i.value}
          >
            <button
              type="button"
              onClick={() => handleOptionClick(i)}
              className={`msv-combobox__optionsContainer__option__label`}
            >
              {i.label}
            </button>
            <EditIconButton
              href={`/dashboard/agencies/${i.value}/edit`}
              className={`msv-combobox__optionsContainer__option__edit`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

Combobox.defaultProps = {
  defaultSelected: undefined,
  placeholder: undefined
}
