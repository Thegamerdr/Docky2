type EventName = 'search' | 'view_product' | 'add_to_cart' | 'remove_from_cart'

interface AnalyticsEvent {
  name: EventName
  properties?: Record<string, any>
}

export function trackEvent({ name, properties = {} }: AnalyticsEvent) {
  // Replace with your analytics provider
  if (typeof window !== 'undefined') {
    console.log(`[Analytics] ${name}:`, properties)
    
    // Example implementation with Google Analytics
    if (window.gtag) {
      window.gtag('event', name, properties)
    }
  }
}

export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_path: url,
    })
  }
}

