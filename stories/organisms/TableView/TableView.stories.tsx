import { Button, TableView } from '../../../shared'
import type { Meta, StoryObj } from '@storybook/react'
import MOCK_DATA from './MOCK_DATA.json'
import { transformData } from './dataTransformExample'
import CustomDocs from './Docs.mdx'
const meta: Meta<typeof TableView> = {
  title: 'Data Display/TableView',
  component: TableView,
  parameters: {
    docs: {
      page: CustomDocs,
    },
  },
  args: {},
}

export default meta

type Story = StoryObj<typeof TableView>

export const Default: Story = {
  args: {
    tableData: transformData(MOCK_DATA),
    tableTitle: 'Table',
    itemsPerPage: 5,
    actionButtons: [
      <Button key="button1" color="secondary">
        Button
      </Button>,
      <Button key="button1">Button</Button>,
    ],
  },
}
