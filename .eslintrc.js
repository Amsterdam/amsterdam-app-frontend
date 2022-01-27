module.exports = {
  root: true,
  plugins: ['import'],
  extends: '@react-native-community',
  rules: {
    'import/no-default-export': 'warn',
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
}
