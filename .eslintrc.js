module.exports = {
  root: true,
  plugins: [
    'import',
    'jsx-expressions',
    'prefer-arrow-functions',
    'typescript-sort-keys',
    'jest',
    'sonarjs',
    'amsterdam',
  ],
  extends: [
    '@react-native',
    'plugin:storybook/recommended',
    'plugin:storybook/csf',
    'plugin:storybook/csf-strict',
    'plugin:react/jsx-runtime',
    'plugin:sonarjs/recommended',
  ],
  ignorePatterns: [
    '!.storybook',
    '!.*',
    'node_modules',
    'android',
    'ios',
    'patches',
    'pipelines',
    'storybook-static',
  ],
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
            name: '@gorhom/bottom-sheet',
            importNames: ['BottomSheet'],
            message:
              'Import BottomSheet from @/components/ui/containers/BottomSheet.',
          },
          {
            name: '@react-navigation/stack',
            importNames: ['createStackNavigator'],
            message:
              'Import createStackNavigator from @/utils/navigation/createStackNavigator.',
          },
          {
            name: 'dayjs',
            importNames: ['default'],
            message:
              'Import dayjs from @/utils/datetime to prevent timezone issues.',
          },
          {
            name: 'react-native-super-grid',
            importNames: ['SimpleGrid'],
            message:
              'Import SimpleGrid from @/components/ui/containers/SimpleGrid.',
          },
          {
            name: 'react-redux',
            importNames: ['useDispatch'],
            message: 'Import useDispatch from @/hooks/redux/useDispatch.',
          },
          {
            name: 'react-redux',
            importNames: ['useSelector'],
            message: 'Import useSelector from @/hooks/redux/useSelector.',
          },
          {
            name: '@react-navigation/core',
            importNames: [
              'NavigationProp',
              'RouteProp',
              'useNavigation',
              'useRoute',
            ],
            message:
              'Import NavigationProp and RouteProp from @/app/navigation/types; useNavigation and useRoute from @/hooks/navigation/.',
          },
          {
            name: '@react-navigation/native',
            importNames: [
              'NavigationProp',
              'RouteProp',
              'useNavigation',
              'useRoute',
            ],
            message:
              'Import NavigationProp and RouteProp from @/app/navigation/types; useNavigation and useRoute from @/hooks/navigation/.',
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
    'react/jsx-no-explicit-spread': 'off',
    'amsterdam/jsx-no-explicit-spread': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['block', 'block-like', 'return'],
      },
      {
        blankLine: 'always',
        prev: ['block', 'block-like'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    'no-console': 'error',
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
        'no-restricted-imports': 'off',
        'sonarjs/no-identical-functions': 'off',
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
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
  env: {
    'react-native/react-native': true,
    jest: true,
  },
}
