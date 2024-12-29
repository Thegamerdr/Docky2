/**
 * Modern domain processing utility that replaces punycode functionality
 */
export function processDomain(domain: string): string {
  try {
    // Use the native URL API instead of punycode
    const url = new URL(`https://${domain}`)
    return url.hostname
  } catch (error) {
    console.error('Error processing domain:', error)
    return domain
  }
}

export function isValidDomain(domain: string): boolean {
  try {
    // Use built-in URL constructor for validation
    new URL(`https://${domain}`)
    return true
  } catch {
    return false
  }
}

