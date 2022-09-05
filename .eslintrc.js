module.exports = {
  root: true,
  plugins: ['import', 'jsx-expressions'],
  extends: [
    '@react-native-community',
    'plugin:storybook/recommended',
    'plugin:storybook/csf',
    'plugin:storybook/csf-strict',
  ],
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
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['.*'],
            message:
              "Please use a clean path like: '@/components/something' instead of '../components/something'.",
          },
        ],
        paths: [
          {
            name: 'dayjs',
            importNames: ['default'],
            message:
              'Import dayjs from @/utils/datetime to prevent timezone issues.',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
        'no-restricted-imports': 'off',
      },
    },
    {
      files: ['index.ts'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['../*'],
                message: "Barrelfile imports should stats with './' or '@/'",
              },
            ],
          },
        ],
      },
    },
    {
      files: ['.storybook/mocks/**/*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],

      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        'jsx-expressions/strict-logical-expressions': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
      },

      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx'],
      rules: {
        'no-restricted-imports': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
  env: {
    'react-native/react-native': true,
    'jest/globals': true,
  },
}
