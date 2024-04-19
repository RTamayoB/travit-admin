import { SideBar } from '../../shared'
import type { Meta, StoryObj } from '@storybook/react'
import SettingsLogo from '../../shared/assets/svg/settings.svg'
import LogoutLogo from '../../shared/assets/svg/logout.svg'
import UserLogo from '../../shared/assets/svg/user.svg'
import StopsLogo from '../../shared/assets/svg/paradas.svg'
import RoutesLogo from '../../shared/assets/svg/rutas.svg'

const meta = {
  title: 'Example/SideBar',
  component: SideBar,
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof SideBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    footerItems: [
      { label: 'Perfil', icon: UserLogo },
      { label: 'Configuracion', icon: SettingsLogo },
      { label: 'Salir', icon: LogoutLogo },
    ],
    contentItems: [
      { label: 'Rutas', icon: RoutesLogo },
      {
        label: 'Paradas',
        icon: StopsLogo,
        onClick: () => console.log('Stops'),
      },
    ],
  },
}
