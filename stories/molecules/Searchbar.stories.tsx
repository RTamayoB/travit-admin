import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Searchbar } from '../../shared/components'

const meta = {
  title: 'Data Display/Searchbar',
  component: Searchbar,
  parameters: {
    design: {
      type: 'figma',
      url: '',
    },
  },
  tags: ['autodocs'],
  args: {
  },
} satisfies Meta<typeof Searchbar>

export default meta

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    id: 'Searchbar test',
    label: 'Basic Searchbar',
    helperText: 'Only returns the value of the input.',
  },
}

export const ObjectArrayItems: Story = {
  args: {
    id: 'Searchbar test',
    label: 'Search in Object Array',
    helperText:
      'Returns filtered items from a provided array of object<number | string> items.',
  },
}

export const StringArrayItems: Story = {
  args: {
    id: 'Searchbar test',
    label: 'Searchbar in string array',
    helperText: 'Returns filtered items from a provided array of string items.',
  },
}
