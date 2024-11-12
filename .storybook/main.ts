import type { StorybookConfig } from '@storybook/nextjs'
const config: StorybookConfig = {
  stories: [
    '../ui/components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../ui/**/*.stories.@(js|jsx|ts|tsx|mdx)'
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-designs',
    '@storybook/addon-mdx-gfm'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {},
  staticDirs: ['../public'],
}
export default config
