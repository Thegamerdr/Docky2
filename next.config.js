const withNextIntl = require('next-intl/plugin')()
const withMDX = require('@next/mdx')()

module.exports = withNextIntl(
  withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  })
)

