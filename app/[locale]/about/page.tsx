import { notFound } from 'next/navigation'
import { useLocale } from 'next-intl'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default async function AboutPage() {
  const locale = useLocale()

  let Content
  try {
    Content = await import(`./${locale}.mdx`)
  } catch (error) {
    notFound()
  }

  return (
    <article className="prose prose-blue dark:prose-invert max-w-4xl mx-auto px-4 py-8">
      <MDXRemote source={Content.default} />
    </article>
  )
}

