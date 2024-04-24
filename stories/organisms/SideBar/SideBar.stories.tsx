import { SideBar } from '../../../shared'
import type { Meta, StoryObj } from '@storybook/react'
import { USER_SIDEBAR_MOCK, NON_USER_SIDEBAR_MOCK } from './MOCK_DATA'
import CustomDocs from './Docs.mdx'

const meta: Meta<typeof SideBar> = {
  title: 'Navigation/SideBar',
  component: SideBar,
  parameters: {
    docs: {
      page: CustomDocs,
    },
  },
  args: {},
}

export default meta

type Story = StoryObj<typeof meta>

export const NoUserSession: Story = {
  args: NON_USER_SIDEBAR_MOCK,
}

export const UserSession: Story = {
  args: USER_SIDEBAR_MOCK,
}
