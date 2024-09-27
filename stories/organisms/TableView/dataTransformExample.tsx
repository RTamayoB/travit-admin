import {
  Badge,
  TransformDataTable,
  Typography,
  TextField,
} from '../../../shared'

interface TestData {
  id: number
  email: string
  gender: string
  last_name: string
  first_name: string
}

export const transformData = (data: TestData[]): TransformDataTable[] => {
  return data.map(({ id, first_name, last_name, email, gender }) => ({
    id: { value: id.toString(), component: <Badge label={id.toString()} /> },
    first_name: {
      value: first_name,
      component: <Typography>{first_name}</Typography>,
    },
    last_name: {
      value: last_name,
      component: <Typography>{last_name}</Typography>,
    },
    email: { value: email, component: <TextField id="email" value={email} /> },
    gender: { value: gender, component: <Typography>{gender}</Typography> },
  }))
}
