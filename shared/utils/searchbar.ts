export interface ObjectNumberString {
  [key: string]: number | string
}
// search in any object of type number | string
export const getKeyByValue = (object: ObjectNumberString, value: string) => {
  return Object.keys(object).find((key) =>
    object[key as keyof object]
      .toString()
      .toLowerCase()
      .includes(value?.toLowerCase()),
  )
}
