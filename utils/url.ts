const IDN_REGEX = /[^\u0000-\u007E]/

export function processUrl(url: string): string {
  try {
    const parsedUrl = new URL(url)
    // Handle internationalized domain names
    if (IDN_REGEX.test(parsedUrl.hostname)) {
      return parsedUrl.href
    }
    return url
  } catch (error) {
    console.error('Error processing URL:', error)
    return url
  }
}

export function normalizeUrl(url: string): string {
  if (!url) return ''
  
  try {
    // Ensure URL has protocol
    const hasProtocol = /^[a-zA-Z]+:\/\//.test(url)
    const urlWithProtocol = hasProtocol ? url : `https://${url}`
    
    const normalized = new URL(urlWithProtocol)
    return normalized.toString()
  } catch (error) {
    console.error('Error normalizing URL:', error)
    return url
  }
}

