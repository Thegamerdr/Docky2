import type { Meta, StoryObj } from '@storybook/react'
import { TranslationStatus } from './TranslationStatus'
import { rest } from 'msw'

const meta: Meta<typeof TranslationStatus> = {
  title: 'Components/TranslationStatus',
  component: TranslationStatus,
  parameters: {
    msw: {
      handlers: [
        rest.get('/api/translations/status', (req, res, ctx) => {
          return res(
            ctx.json([
              {
                locale: 'es',
                progress: 75,
                totalStrings: 100,
                translatedStrings: 75,
              },
              {
                locale: 'fr',
                progress: 50,
                totalStrings: 100,
                translatedStrings: 50,
              },
            ])
          )
        }),
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof TranslationStatus>

export const Default: Story = {}

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('/api/translations/status', (req, res, ctx) => {
          return res(ctx.delay(2000), ctx.json([]))
        }),
      ],
    },
  },
}

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        rest.get('/api/translations/status', (req, res, ctx) => {
          return res(ctx.status(500))
        }),
      ],
    },
  },
}

