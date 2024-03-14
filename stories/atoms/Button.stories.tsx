import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import testImg from '../assets/accessibility.svg'
import Image from 'next/image'
import { Button } from '../../shared/components'
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
    design: {
      type: 'figma',
      url: "https://www.figma.com/file/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?type=design&node-id=6-64150&mode=design&t=qmEk3xCCXNU73aDo-11",
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Primary',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Secondary',
    color: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
}

export const LeadIcon: Story = {
  args: {
    label: 'Lead Icon',
    leadIcon: <Image alt="Test Image" src={testImg} width={20} height={20} />,
  },
}

export const TrailIcon: Story = {
  args: {
    label: 'Trail Icon',
    trailIcon: <Image alt="Test Image" src={testImg} width={20} height={20} />,
  },
}

export const CustomStyle: Story = {
  args: {
    label: 'Custom Style',
    style: {
      border: '3px solid pink',
    },
  },
}
