import type { AppProps } from 'next/app'
import { NextIntlProvider } from 'next-intl'
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import Toaster from '@/components/ui/toaster'
import { Analytics } from '@/components/Analytics'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Component {...pageProps} />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </SessionProvider>
    </NextIntlProvider>
  )
}

