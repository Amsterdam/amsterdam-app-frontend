module.exports = {
  root: true,
  plugins: [
    'detox',
    'import',
    'jsx-expressions',
    'prefer-arrow-functions',
    'typescript-sort-keys',
  ],
  extends: [
    '@react-native',
    'plugin:storybook/recommended',
    'plugin:storybook/csf',
    'plugin:storybook/csf-strict',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['!.storybook', '!.*', 'node_modules'],
  rules: {
    'import/no-default-export': 'error',
    'import/no-cycle': 2,
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
    'no-void': ['error', {allowAsStatement: true}],
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
          {
            name: '@react-navigation/stack',
            importNames: ['createStackNavigator'],
            message:
              'Import createStackNavigator from @/utils/navigation to automatically be accessible.',
          },
        ],
      },
    ],
    'prefer-arrow-functions/prefer-arrow-functions': [
      'error',
      {
        returnStyle: 'implicit',
      },
    ],
    'react/jsx-sort-props': [
      'error',
      {
        ignoreCase: true,
      },
    ],
    'prettier/prettier': 'warn',
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
        'plugin:typescript-sort-keys/recommended',
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
