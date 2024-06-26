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
    'react-refresh',
  ],
  extends: [
    '@react-native',
    'plugin:storybook/recommended',
    'plugin:storybook/csf',
    'plugin:storybook/csf-strict',
    'plugin:react/jsx-runtime',
    'plugin:sonarjs/recommended-legacy', // legacy is for ESlint 8
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
    'react-refresh/only-export-components': 'warn',
    'react-native/no-raw-text': [
      'error',
      {skip: ['Phrase', 'Paragraph', 'InlineLink']},
    ],
    'import/no-default-export': 'error',
    'import/order': [
      'warn',
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
            name: '@/providers/piwik.provider',
            importNames: ['PiwikContext'],
            message:
              'Do not use PiwikContext directly. The logging methods are exposed via the usePiwik hook.',
          },
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
            name: 'react-native-device-info',
            importNames: ['getUniqueId', 'getUniqueIdSync'],
            message:
              'Do not use getUniqueId, this is considered personal (privacy sensitive) information.',
          },
          {
            name: 'react-native-super-grid',
            importNames: ['SimpleGrid'],
            message:
              'Import SimpleGrid from @/components/ui/containers/SimpleGrid.',
          },
          {
            name: 'react-redux',
            importNames: ['useDispatch', 'useSelector'],
            message: 'Import useDispatch and useSelector from @/hooks/redux.',
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
          {
            name: 'react-native',
            importNames: ['Pressable', 'PressableProps'],
            message:
              'Import Pressable and PressableProps from @/components/ui/buttons/Pressable.',
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
      'warn',
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
    'no-console': 'warn',
  },
  overrides: [
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
    // Jest
    {
      files: ['*.test.ts', '*.test.tsx'],
      rules: {
        'no-restricted-imports': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'sonarjs/no-duplicate-string': 'off',
      },
    },
    // Storybook config folder and stories
    {
      files: ['.storybook/**/*', '*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
        'no-restricted-imports': 'off',
        'sonarjs/no-identical-functions': 'off',
      },
    },
  ],
  env: {
    'react-native/react-native': true,
    jest: true,
  },
}
