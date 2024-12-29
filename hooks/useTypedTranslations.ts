import { useTranslations } from 'next-intl'

export function useTypedTranslations<
  Namespace extends keyof IntlMessages,
  Messages extends IntlMessages[Namespace] = IntlMessages[Namespace]
>(namespace: Namespace) {
  return useTranslations(namespace) as {
    (key: keyof Messages): string
    rich(key: keyof Messages, values?: Record<string, unknown>): string
  }
}

