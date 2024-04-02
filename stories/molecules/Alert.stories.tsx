import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from '../../shared'
import Image from 'next/image'
import SourceImage from '../../shared/assets/svg/doubleArrowLeft.svg'
import { fn } from '@storybook/test'
const meta = {
  title: 'Alerts/Alert',
  component: Alert,
  parameters: {
    design: {
      type: 'figma',
      url: "https://www.figma.com/file/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?type=design&node-id=384-28120&mode=design&t=TC6PXRrouCuYYXpQ-0",
    },
  },
  tags: ['autodocs'],
  args: {
    onClose: fn(),
  },
  argTypes: {
    icon: {
      control: 'disabled',
    },
  },
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  args: {
    variant: 'success',
    children: 'All variants',
    closable: false,
  },
}

export const NoIcon: Story = {
  args: {
    variant: 'success',
    children: 'All variants',
    closable: false,
    icon: false,
  },
}

export const Closable: Story = {
  args: {
    variant: 'success',
    children: 'Closable Alert',
    closable: true,
  },
}

export const CustomIcon: Story = {
  args: {
    variant: 'success',
    children: 'Custom Icon',
    closable: true,
    icon: <Image src={SourceImage} alt="Source Image" />,
  },
}
