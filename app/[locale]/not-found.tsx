import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  const t = useTranslations('error')

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">{t('pageNotFound')}</p>
        <Button asChild>
          <Link href="/" className="gap-2">
            <Home className="h-4 w-4" />
            {t('returnHome')}
          </Link>
        </Button>
      </div>
    </div>
  )
}

