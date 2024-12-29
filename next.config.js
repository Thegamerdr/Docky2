const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  // Enable internationalized routing
  i18n: {
    locales: ['en', 'es', 'fr', 'ar'],
    defaultLocale: 'en',
    domains: [
      {
        domain: 'example.com',
        defaultLocale: 'en',
      },
      {
        domain: 'example.es',
        defaultLocale: 'es',
      },
      {
        domain: 'example.fr',
        defaultLocale: 'fr',
      },
      {
        domain: 'example.ae',
        defaultLocale: 'ar',
      },
    ],
  },
  // Modern handling of URL imports
  webpack: (config, { isServer }) => {
    // Replace url loader with asset modules
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    })

    return config
  },
}

module.exports = withMDX(nextConfig)

