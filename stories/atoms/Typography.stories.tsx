import { Typography } from '../../shared/components'
import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  parameters: {
    design: {
      type: 'figma',
      url: "https://www.figma.com/file/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?type=design&node-id=1-758&mode=design&t=vrcFO9iOVFKlU3Yx-0",
    },
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

export const AllSizes: Story = {
  args: {
    children: 'Typography',
  },
}
