import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from '../../shared'

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    totalPages: 9,
    rounded: false,
    align: 'center',
    onIndexChange: (index) => console.log(index),
  },
}
