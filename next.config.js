const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
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

    // Add MDX loader
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        },
      ],
    })

    return config
  },
  // Add MDX file support
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
}

module.exports = withMDX(nextConfig)

