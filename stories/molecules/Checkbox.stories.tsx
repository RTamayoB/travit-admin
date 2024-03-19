import { Checkbox } from '../../shared'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Molecules/Checkbox',
  component: Checkbox,
  parameters: {
    design: {
      type: 'figma',
      url: "https://www.figma.com/file/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?type=design&node-id=11-64151&mode=design&t=SBAEeErVlESOLBr3-0",
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'disabled',
    },
    defaultChecked: {
      control: 'disabled',
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    disabled: false,
    label: 'Test Label',
    onChecked: (value) => console.log(value),
  },
}

export const DefaultChecked: Story = {
  args: {
    disabled: false,
    label: 'Test Label',
    defaultChecked: true,
    onChecked: (value) => console.log(value),
  },
}
