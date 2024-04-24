import SettingsLogo from '../../../shared/assets/svg/settings.svg'
import LogoutLogo from '../../../shared/assets/svg/logout.svg'
import StopsLogo from '../../../shared/assets/svg/paradas.svg'
import RoutesLogo from '../../../shared/assets/svg/rutas.svg'
import { SideBarItemProps, SideBarProps } from '../../../shared'

// Top Items
const contentItems: SideBarItemProps[] = [
  {
    label: 'Rutas',
    icon: RoutesLogo,
    subItems: [
      {
        label: 'Configuracion',
        icon: SettingsLogo,
        route: '/settings',
        onClick: (route) => console.log(route),
      },
      {
        label: 'Salir',
        icon: LogoutLogo,
        route: '/logout',
        onClick: (route) => console.log(route),
      },
    ],
    onClick: (route) => console.log(route),
    route: '/routes',
  },
  {
    label: 'Paradas',
    icon: StopsLogo,
    onClick: (route) => console.log(route),
    route: '/stops',
  },
]
// Footer items if there is an existing user
const userItems: SideBarItemProps[] = [
  {
    label: 'Configuracion',
    icon: SettingsLogo,
    route: '/settings',
    onClick: (e) => console.log(e),
  },
  {
    label: 'Salir',
    icon: LogoutLogo,
    route: '/profile',
    onClick: (e) => console.log(e),
  },
]
// Mock of an user
const user: SideBarItemProps = {
  subtitle: 'CEO',
  route: '/profile',
  isForProfile: true,
  label: 'Anaid Ortega',
  onClick: (route) => console.log(route),
}
// Footer Items if theres not an existing user
const nonUserItems: SideBarItemProps[] = [
  {
    label: 'Iniciar sesión',
    icon: LogoutLogo,
    route: '/login',
    onClick: (e) => console.log(e),
  },
]

export const USER_SIDEBAR_MOCK: SideBarProps = {
  contentItems,
  user,
  footerItems: userItems,
}
export const NON_USER_SIDEBAR_MOCK: SideBarProps = {
  contentItems,
  footerItems: nonUserItems,
}
