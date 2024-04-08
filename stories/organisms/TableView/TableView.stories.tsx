import { Button, TableView } from '../../../shared'
import type { Meta, StoryObj } from '@storybook/react'
import MOCK_DATA from './MOCK_DATA.json'
import { transformData } from './dataTransformExample'
const meta = {
  title: 'Example/TableView',
  component: TableView,
  parameters: {
    design: {
      type: 'figma',
      url: "https://www.figma.com/file/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?type=design&node-id=301-111431&mode=design&t=1toTGSnHcpAyI3Om-0",
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
    tableTitle: 'Table',
    actionButtons: [
      <Button key="button1" color="secondary">
        Button
      </Button>,
      <Button key="button1">Button</Button>,
    ],
  },
}
