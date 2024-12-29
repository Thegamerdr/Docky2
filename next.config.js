const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure that the i18n configuration is commented out or removed
  // i18n: {
  //   locales: ['en', 'es', 'fr'],
  //   defaultLocale: 'en'
  // },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

module.exports = withNextIntl(withMDX(nextConfig));

