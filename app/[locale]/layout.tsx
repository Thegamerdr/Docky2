import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { ErrorHandler } from '@/components/ErrorHandler'
import { Analytics } from '@/components/Analytics'
import { ResourceBlockerNotice } from '@/components/ResourceBlockerNotice'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'PerfumeVS - Compare and Discover Fragrances',
    template: '%s | PerfumeVS'
  },
  description: 'Compare perfumes side by side, discover new fragrances, and find your perfect scent with PerfumeVS.',
  // ... (rest of the metadata remains the same)
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}

export default async function RootLayout({
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
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ErrorHandler error={null} />
            <ResourceBlockerNotice />
            {children}
            <Toaster />
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

