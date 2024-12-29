const withNextIntl = require('next-intl/plugin')()
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})

module.exports = withNextIntl(
  withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    // other Next.js config options here
  })
)

