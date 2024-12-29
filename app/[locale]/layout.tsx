import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import { IntlSupportWarning } from '@/components/IntlSupportWarning'
import { IntlPolyfills } from '@/lib/intlPolyfills' // Updated import

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

  const browserCheck = `
    if (typeof window !== 'undefined') {
      // Check if the browser supports Intl
      if (!window.Intl || !window.Intl.DateTimeFormat) {
        // If not, display a warning message
        console.warn('Browser does not support Intl. Please update your browser.');
      }
    }
  `;


  return (
    <html lang={locale} className={inter.className}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: browserCheck }} />
      </head>
      <body>
        <IntlPolyfills /> {/*Ensured IntlPolyfills is used*/}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <IntlSupportWarning />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

