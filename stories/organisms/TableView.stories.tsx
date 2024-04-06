import { TableView, Typography } from '../../shared'
import type { Meta, StoryObj } from '@storybook/react'
import MOCK_DATA from '../../shared/components/organisms/TableView/MOCK_DATA.json'
import { transformData } from '../../shared/components/organisms/TableView/dataTransformExample'
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
  args: {
    tableData: transformData(MOCK_DATA),
  },
}
