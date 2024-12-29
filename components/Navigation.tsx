'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/utils/navigation'

export function Navigation() {
  const t = useTranslations('navigation')

  const links = [
    { href: '/', label: 'home' },
    { href: '/browse', label: 'browse' },
    { href: '/compare', label: 'compare' },
    { href: '/wishlist', label: 'wishlist' },
  ] as const

  return (
    <nav aria-label={t('mainNavigation')}>
      <ul className="flex space-x-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              {t(link.label)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

