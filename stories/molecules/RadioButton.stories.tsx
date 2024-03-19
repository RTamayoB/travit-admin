import { RadioButton } from '../../shared'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Molecules/RadioButton',
  component: RadioButton,
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof RadioButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
