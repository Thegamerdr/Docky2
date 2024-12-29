import { useLocale } from 'next-intl'
import Script from 'next/script'

const requiredPolyfills = [
  'Intl',
  'Intl.Locale',
  'Intl.DateTimeFormat',
  'Intl.NumberFormat',
  'Intl.PluralRules',
  'Intl.RelativeTimeFormat',
  'Intl.ListFormat'
]

export function IntlPolyfills() {
  const locale = useLocale()

  const polyfillUrl = `https://polyfill.io/v3/polyfill.min.js?features=${
    requiredPolyfills.map(feature => `${feature}%2C${feature}~locale=${locale}`).join('%2C')
  }`

  return (
    <Script
      src={polyfillUrl}
      strategy="beforeInteractive"
    />
  )
}

