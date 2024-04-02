import type { Meta, StoryObj } from '@storybook/react'
import testImg from '../../shared/assets/svg/circle.svg'
import { TextField } from '../../shared'
import Image from 'next/image'
import { fn } from '@storybook/test'

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
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'Test Input',
    label: 'Test Input',
    placeholder: 'Placeholder',
    helperText: 'Texto opcional para el apoyo del usuario',
  },
}

export const LeadIcon: Story = {
  args: {
    id: 'Test Input',
    label: 'Test Input',
    placeholder: 'Placeholder',
    helperText: 'Texto opcional para el apoyo del usuario',
    leadIcon: <Image alt="Test Image" src={testImg} width={20} height={20} />,
  },
}

export const TrailIcon: Story = {
  args: {
    id: 'Test Input',
    label: 'Test Input',
    placeholder: 'Placeholder',
    helperText: 'Texto opcional para el apoyo del usuario',
    trailIcon: <Image alt="Test Image" src={testImg} width={20} height={20} />,
  },
}

export const ErrorState: Story = {
  args: {
    id: 'Test Input',
    inputState: 'error',
    label: 'Test Input',
    placeholder: 'Placeholder',
    helperText: 'Texto opcional para el apoyo del usuario',
  },
}
export const SuccessState: Story = {
  args: {
    id: 'Test Input',
    inputState: 'success',
    label: 'Test Input',
    required: true,
    placeholder: 'Placeholder',
    helperText: 'Texto opcional para el apoyo del usuario',
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
    id: 'Test Input',
    label: 'Test Input',
    placeholder: 'Placeholder',
    helperText: 'Texto opcional para el apoyo del usuario',
  },
}
