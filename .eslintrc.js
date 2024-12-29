module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // Avoid hardcoded labels in component markup
    'react/jsx-no-literals': ['error', {
      noStrings: true,
      allowedStrings: ['/', '-'],
      ignoreProps: true,
      noAttributeStrings: false,
    }],

    // Ensure consistent usage of next-intl navigation APIs
    'no-restricted-imports': ['error', {
      paths: [{
        name: 'next/navigation',
        importNames: ['useRouter', 'usePathname', 'useSearchParams'],
        message: 'Please use the corresponding exports from next-intl/client instead.',
      }],
    }],

    // Enforce usage of type-safe translations
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

