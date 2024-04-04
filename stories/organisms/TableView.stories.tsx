import { TableView } from '../../shared'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Example/TableView',
  component: TableView,
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof TableView>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
