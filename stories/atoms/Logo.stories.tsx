import { Logo } from '../../shared'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Brand Image/Logo',
  component: Logo,
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

export const Logotipo: Story = {
  args: {
    width: 300,
    height: 300,
  },
}

export const Isotipo: Story = {
  args: {
    variant: 'iso',
    width: 300,
    height: 300,
  },
}
