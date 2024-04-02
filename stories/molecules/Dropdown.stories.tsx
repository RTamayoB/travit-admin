import { fn } from '@storybook/test'
import { Dropdown } from '../../shared'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Form Elements/Dropdown',
  component: Dropdown,
  parameters: {
    design: {
      type: 'figma',
      url: "https://www.figma.com/file/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?type=design&node-id=12-65111&mode=design&t=zw7r82gwLAfYkCma-0",
    },
  },
  tags: ['autodocs'],

  args: { onSelected: fn() },
} satisfies Meta<typeof Dropdown>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: [
      { label: 'Uno', value: '1' },
      { label: 'Dos', value: '2' },
      { label: 'Tres', value: '3' },
      { label: 'Cuatro', value: '4' },
      { label: 'Cinco', value: '5' },
      { label: 'Seis', value: '6' },
    ],
  },
}
