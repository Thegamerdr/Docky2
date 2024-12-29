import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ThemeToggle } from '@/components/ThemeToggle'

const DynamicFooter = dynamic(() => import('@/components/Footer'), {
  loading: () => <p>Loading...</p>,
})

export function Layout({ children }: { children: React.ReactNode }) {
  const t = useTranslations('navigation')

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black">
        Skip to main content
      </a>
      <header className="bg-blue-800 text-white py-4" role="banner">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold" aria-label="PerfumeVS Home">PerfumeVS</Link>
          <nav aria-label="Main Navigation">
            <ul className="flex space-x-4 items-center">
              <li>
                <Link href="/" className="hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/browse" className="hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded">
                  {t('browse')}
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded">
                  {t('wishlist')}
                </Link>
              </li>
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content" className="flex-grow" role="main">
        {children}
      </main>

      <DynamicFooter />
    </div>
  )
}

