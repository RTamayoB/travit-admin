import { TextField, Typography } from '../../atoms'
import { Badge } from '../../molecules'

interface TestData {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: string
}

export const transformData = (data: TestData[]) => {
  return data.map(({ id, first_name, last_name, email, gender }) => ({
    id: <Badge label={id.toString()} />,
    first_name: <Typography>{first_name}</Typography>,
    last_name: <Typography>{last_name}</Typography>,
    email: <TextField id="email" value={email} />,
    gender: <Typography>{gender}</Typography>,
  }))
}
