import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import testImg from '../assets/accessibility.svg'
import Image from 'next/image'
import { Button } from '../../shared/components'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas.https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
    design: {
      type: 'figma',
      url: "https://www.figma.com/file/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?type=design&node-id=6-64150&mode=design&t=qmEk3xCCXNU73aDo-11",
    },
  },
  tags: ['autodocs'],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked.
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    color: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

export const LeadIcon: Story = {
  args: {
    children: 'Lead Icon',
    leadIcon: <Image alt="Test Image" src={testImg} width={20} height={20} />,
  },
}

export const TrailIcon: Story = {
  args: {
    children: 'Trail Icon',
    trailIcon: <Image alt="Test Image" src={testImg} width={20} height={20} />,
  },
}

export const CustomStyle: Story = {
  args: {
    children: 'Custom Style',
    style: {
      border: '3px solid pink',
    },
  },
}
