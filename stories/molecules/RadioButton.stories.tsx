import { fn } from '@storybook/test'
import { RadioButton } from '../../shared'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Selectors/RadioButton',
  component: RadioButton,
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof RadioButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: ['Uno', 'Dos', 'Tres'],
    disabled: false,
  },
}
