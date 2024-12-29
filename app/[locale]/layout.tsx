import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import { IntlPolyfills } from '@/components/IntlPolyfills'
import { IntlSupportWarning } from '@/components/IntlSupportWarning'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }, { locale: 'fr' }]
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale} className={inter.className}>
      <body>
        <IntlPolyfills />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <IntlSupportWarning />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

