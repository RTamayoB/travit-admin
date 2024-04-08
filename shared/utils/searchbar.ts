import { TransformDataTable } from '../../stories/organisms/TableView/dataTransformExample'

export interface ObjectNumberString {
  [key: string]: number | string
}
// search in any object of type number | string
export const filterBySearch = (
  e: ObjectNumberString | TransformDataTable | string,
  search: string,
) => {
  if (typeof e === 'object') {
    // filter searchItems by object value
    const values = Object.values(e)
    return values.find((val) => {
      if (typeof val === 'object') {
        return Object.values(val as TransformDataTable).find((sval) =>
          sval.toString().toLowerCase().includes(search?.toLowerCase()),
        )
      }
      if (typeof val === 'string') {
        return val.toString().toLowerCase().includes(search?.toLowerCase())
      }
    })
  } else {
    // filter searchItems by string value
    return e.toLowerCase().includes(search.toLowerCase())
  }
}
