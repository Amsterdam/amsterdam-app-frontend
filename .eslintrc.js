module.exports = {
  root: true,
  plugins: ['import'],
  extends: '@react-native-community',
  rules: {
    'import/no-default-export': 'error',
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'index',
          'internal',
          'parent',
          'sibling',
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
