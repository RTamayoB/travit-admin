import { SideBar } from '../../../shared'
import type { Meta, StoryObj } from '@storybook/react'
import { SIDEBAR_MOCK } from './MOCK_DATA'

const meta = {
  title: 'Navigation/SideBar',
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
  args: SIDEBAR_MOCK,
}
