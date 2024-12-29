export function checkIntlSupport(locale: string): boolean {
  try {
    // Check basic Intl support
    if (typeof Intl === 'undefined') return false

    // Check Locale support
    new Intl.Locale(locale)

    // Check DateTimeFormat support
    new Intl.DateTimeFormat(locale).format(new Date())

    // Check NumberFormat support
    new Intl.NumberFormat(locale).format(123456.789)

    // Check PluralRules support
    new Intl.PluralRules(locale).select(1)

    // Check RelativeTimeFormat support
    new Intl.RelativeTimeFormat(locale).format(1, 'day')

    // Check ListFormat support
    new Intl.ListFormat(locale).format(['a', 'b'])

    return true
  } catch (error) {
    return false
  }
}

