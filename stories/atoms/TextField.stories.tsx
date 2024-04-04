import type { Meta, StoryObj } from '@storybook/react'
import testImg from '../../shared/assets/svg/checkmark.svg'
import { TextField } from '../../shared'
import Image from 'next/image'

const meta = {
  title: 'Form Elements/TextField',
  component: TextField,
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    leadIcon: <Image alt="Test Image" src={testImg} width={20} height={20} />,
    trailIcon: <Image alt="Test Image" src={testImg} width={20} height={20} />,
  },
}
