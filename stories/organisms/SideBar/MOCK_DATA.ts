import SettingsLogo from '../../../shared/assets/svg/settings.svg'
import LogoutLogo from '../../../shared/assets/svg/logout.svg'
import StopsLogo from '../../../shared/assets/svg/paradas.svg'
import RoutesLogo from '../../../shared/assets/svg/rutas.svg'
import {Destination, SideBarProps} from '../../../shared'
import { UserInfo } from '@/app/lib/definitions'

// Top Items
const contentItems: Destination[] = [
  {
    label: 'Rutas',
    icon: RoutesLogo,
    route: '/routes',
  },
  {
    label: 'Paradas',
    icon: StopsLogo,
    route: '/stops',
  },
]
// Footer items if there is an existing user
const userItems: Destination[] = [
  {
    label: 'Configuracion',
    icon: SettingsLogo,
    route: '/settings',
  },
  {
    label: 'Salir',
    icon: LogoutLogo,
    route: '/profile',
  },
]
// Mock of an user
const userInfo: UserInfo = {
  id: 0,
  full_name: 'Name',
  username: 'UserName',
  role: 'Manager'
}

export const USER_SIDEBAR_MOCK: SideBarProps = {
  userInfo
}
