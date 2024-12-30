module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['react', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    exclude: ['.eslintrc.js', 'tailwind.config.js', 'version-checker.js'],
  },
  rules: {
    'react/jsx-no-literals': ['error', {
      noStrings: true,
      allowedStrings: ['/', '-'],
      ignoreProps: true,
      noAttributeStrings: false,
    }],
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

