import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../../shared'
import { TestCircle } from '../../shared/assets/icons'

const meta = {
  title: 'Alerts/Badge',
  component: Badge,
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    label: 'State',
  },
}

export const LeadIcon: Story = {
  args: {
    label: 'State',
    LeadIcon: TestCircle,
  },
}

export const TrailIcon: Story = {
  args: {
    label: 'State',
    TrailIcon: TestCircle,
  },
}

export const LeadAndTrailIcon: Story = {
  args: {
    label: 'State',
    LeadIcon: TestCircle,
    TrailIcon: TestCircle,
  },
}
