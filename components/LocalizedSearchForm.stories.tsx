import type { Meta, StoryObj } from '@storybook/react'
import { LocalizedSearchForm } from './LocalizedSearchForm'
import { rest } from 'msw'

const meta: Meta<typeof LocalizedSearchForm> = {
  title: 'Components/LocalizedSearchForm',
  component: LocalizedSearchForm,
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [
        rest.get('/api/search', (req, res, ctx) => {
          return res(ctx.json({ results: [] }))
        }),
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof LocalizedSearchForm>

export const Default: Story = {}

export const WithDifferentLocale: Story = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="es" messages={require('../messages/es.json')}>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
}

