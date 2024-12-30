'use client'

import { useRouter } from '@/utils/navigation'
import { useTranslations } from 'next-intl'
import Button from '@/components/ui/button'
import { Search } from 'lucide-react'
import Input from '@/components/ui/input'

export function LocalizedSearchForm() {
  const t = useTranslations('search')
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const query = formData.get('query')?.toString() || ''
    
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="search"
        name="query"
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchLabel')}
        required
      />
      <Button type="submit" onClick={() => {}}>
        <Search className="w-4 h-4 mr-2" aria-hidden="true" />
        {t('searchButton')}
      </Button>
    </form>
  )
}

