import React, { FC } from 'react'
import Image from 'next/image'
import Search from '../../../assets/svg/search.svg'
import {
  TextField,
  TextFieldProps
} from '../../..'
import {useDebouncedCallback} from "use-debounce";
import {usePathname, useRouter, useSearchParams } from 'next/navigation';

export const Searchbar: FC<TextFieldProps> = ({
  id,
  placeholder,
  ...props
}) => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page','1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <TextField
      id={id}
      placeholder={placeholder}
      leadIcon={<Image src={Search} alt={id} />}
      onChange={(e) => handleSearch(e.target.value)}
      {...props}
    />
  )
}

Searchbar.defaultProps = {
  placeholder: ''
}
