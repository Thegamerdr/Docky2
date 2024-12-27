import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/ThemeProvider"
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ToastProvider } from '@/components/ui/toast'
import { CookieConsent } from '@/components/CookieConsent'
import { Analytics } from '@/components/Analytics'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <ErrorBoundary>
          <ToastProvider>
            <Component {...pageProps} />
            <CookieConsent />
            <Analytics />
          </ToastProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp

