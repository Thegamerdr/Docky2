import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Perfume Marketplace Analyzer',
    template: '%s | Perfume Marketplace Analyzer',
  },
  description: 'Compare and analyze perfumes, including dupes and clones.',
  openGraph: {
    title: 'Perfume Marketplace Analyzer',
    description: 'Compare and analyze perfumes, including dupes and clones.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

