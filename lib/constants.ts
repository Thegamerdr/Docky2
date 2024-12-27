export const SITE_CONFIG = {
  name: 'Perfume Market',
  description: 'Discover luxury fragrances from around the world',
  url: process.env.NEXT_PUBLIC_APP_URL,
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/perfumemarket',
    github: 'https://github.com/perfumemarket',
  },
}

export const ANALYTICS_CONFIG = {
  googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
  mixpanel: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
}

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
}

