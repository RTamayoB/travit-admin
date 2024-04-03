import React, { FC } from 'react'
import Image from 'next/image'
import { TextField, TextFieldProps } from '../..'
import Search from '../../../assets/svg/search.svg'
import { ObjectNumberString, getKeyByValue } from '../../../utils/searchbar'

export interface SearchbarProps extends TextFieldProps {
  searchItems?: Array<ObjectNumberString | string>
  onSearch: (
    value: Array<ObjectNumberString | string> | string | undefined,
  ) => void
}

export const Searchbar: FC<SearchbarProps> = ({
  id,
  onSearch,
  searchItems,
  ...props
}) => {
  const handleSearchElements = (search: string) => {
    if (searchItems) {
      onSearch(
        searchItems.filter((e) => {
          if (typeof e === 'object') {
            // filter searchItems by object value
            return getKeyByValue(e, search)
          } else {
            // filter searchItems by string value
            return e.toLowerCase().includes(search.toLowerCase())
          }
        }),
      )
    } else {
      // if there are no searchItems just return search
      onSearch(search)
    }
  }

  return (
    <TextField
      id={id}
      placeholder="Buscar"
      leadIcon={<Image src={Search} alt={id} />}
      onChange={(e) => handleSearchElements(e.target.value)}
      {...props}
    />
  )
}

Searchbar.defaultProps = {
  searchItems: undefined,
}
