import React, { FC } from 'react'
import Image from 'next/image'
import Search from '../../../assets/svg/search.svg'
import {
  TextField,
  TextFieldProps,
  filterBySearch,
  ObjectNumberString,
  TransformDataTable,
} from '../../..'

export interface SearchbarProps extends TextFieldProps {
  searchItems?: Array<ObjectNumberString | string | TransformDataTable>
  onSearch: (
    value:
      | Array<ObjectNumberString | string | TransformDataTable>
      | string
      | undefined,
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
      onSearch(searchItems.filter((e) => filterBySearch(e, search)))
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
