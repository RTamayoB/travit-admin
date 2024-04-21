import SettingsLogo from '../../../shared/assets/svg/settings.svg'
import LogoutLogo from '../../../shared/assets/svg/logout.svg'
import UserLogo from '../../../shared/assets/svg/user.svg'
import StopsLogo from '../../../shared/assets/svg/paradas.svg'
import RoutesLogo from '../../../shared/assets/svg/rutas.svg'
import { SideBarProps } from '../../../shared'

export const SIDEBAR_MOCK = {
  footerItems: [
    {
      label: 'Perfil',
      icon: UserLogo,
      route: '/perfil',
      onClick: (e) => console.log(e),
    },
    {
      label: 'Configuracion',
      icon: SettingsLogo,
      route: '/perfil',
      onClick: (e) => console.log(e),
    },
    {
      label: 'Salir',
      icon: LogoutLogo,
      route: '/perfil',
      onClick: (e) => console.log(e),
    },
  ],
  contentItems: [
    {
      label: 'Rutas',
      icon: RoutesLogo,
      subItems: [
        {
          label: 'Perfil',
          icon: UserLogo,
          route: '/perfil',
          onClick: (e) => console.log(e),
        },
        {
          label: 'Configuracion',
          icon: SettingsLogo,
          route: '/perfil',
          onClick: (e) => console.log(e),
        },
        {
          label: 'Salir',
          icon: LogoutLogo,
          route: '/perfil',
          onClick: (e) => console.log(e),
        },
      ],
      onClick: (e) => console.log(e),
      route: '/perfil',
    },
    {
      label: 'Paradas',
      icon: StopsLogo,
      onClick: (e) => console.log(e),
      route: '/stops',
    },
  ],
} as SideBarProps
