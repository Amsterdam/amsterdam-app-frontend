module.exports = {
  root: false,
  rules: {
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': 'off',
    radix: 'off',
    'func-names': 'off',
    'no-await-in-loop': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    'import/no-default-export': 'off',
    'no-restricted-imports': 'off',
  },
  env: {
    'detox/detox': true,
  },
}