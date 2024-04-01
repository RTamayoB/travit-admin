import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from '../../shared'

const meta = {
  title: 'Alerts/Alert',
  component: Alert,
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {
    icon: {
      control: 'disabled',
    },
  },
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'success',
  },
}
