import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { NextAuthProvider } from '@/components/next-auth-provider'
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
  keywords: ['perfume', 'fragrance', 'comparison', 'scent', 'cologne', 'eau de parfum'],
  authors: [{ name: 'PerfumeVS Team' }],
  creator: 'PerfumeVS',
  publisher: 'PerfumeVS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://perfumevs.com',
    siteName: 'PerfumeVS',
    title: 'PerfumeVS - Compare and Discover Fragrances',
    description: 'Compare perfumes side by side, discover new fragrances, and find your perfect scent with PerfumeVS.',
    images: [
      {
        url: 'https://perfumevs.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PerfumeVS - Compare and Discover Fragrances',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PerfumeVS - Compare and Discover Fragrances',
    description: 'Compare perfumes side by side, discover new fragrances, and find your perfect scent with PerfumeVS.',
    images: ['https://perfumevs.com/twitter-image.jpg'],
    creator: '@perfumevs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={null}>
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
        </NextAuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}

