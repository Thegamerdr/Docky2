import type { Meta, StoryObj } from '@storybook/react'
import { Navigation } from './Navigation'

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof Navigation>

export const Default: Story = {}

export const WithDifferentLocale: Story = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="fr" messages={require('../messages/fr.json')}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
}

