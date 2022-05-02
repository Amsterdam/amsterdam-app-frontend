module.exports = {
  root: true,
  plugins: ['import'],
  extends: '@react-native-community',
  ignorePatterns: ['!.storybook'],
  rules: {
    'import/no-default-export': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'type',
        ],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    semi: ['error', 'never'],
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['.storybook/mocks/**/*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  env: {
    'react-native/react-native': true,
    'jest/globals': true,
  },
}
